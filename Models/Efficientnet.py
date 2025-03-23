import cv2
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.utils import load_img, img_to_array
from tensorflow.keras.applications import EfficientNetB7
from tensorflow.keras import layers, models
from tensorflow.keras.callbacks import ModelCheckpoint

# Binarization function
def binarize(img):
    img = img_to_array(img, dtype='uint8')  # Use img_to_array from tf.keras.utils
    binarized = np.expand_dims(cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 11, 2), -1)
    inverted_binary_img = ~binarized
    return inverted_binary_img


# Data parameters
data_dir = r'C:\Users\rajsa\OneDrive\Desktop\Equation\Dataset'
batch_size = 32
img_height = 45
img_width = 45

# Data generator
train_datagen = ImageDataGenerator(preprocessing_function=binarize)
train_generator = train_datagen.flow_from_directory(
    data_dir,
    target_size=(img_height, img_width),
    batch_size=batch_size,
    color_mode="grayscale",
    class_mode="categorical",
    seed=123)

# Class names
class_names = [k for k, v in train_generator.class_indices.items()]
print(class_names)

# Model definition
inputs = layers.Input(shape=(45, 45, 1))

# Expand to 3 channels
x = layers.Conv2D(3, (3, 3), padding='same')(inputs)

# Pre-trained EfficientNetB7
base_model = EfficientNetB7(include_top=False, weights='imagenet', input_shape=(45, 45, 3), pooling='avg')
base_model.trainable = False  # Freeze base model
x = base_model(x)

# Added Layers
x = layers.BatchNormalization()(x)
x = layers.Dense(256, activation='relu')(x)
x = layers.Dropout(0.5)(x)  # Prevent overfitting
x = layers.Dense(128, activation='relu')(x)
outputs = layers.Dense(26, activation='softmax')(x)

model = models.Model(inputs=inputs, outputs=outputs)

# Compile model
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
model.summary()

# Model checkpoint
checkpoint = ModelCheckpoint(
    filepath='model_epoch_{epoch:02d}.h5',  # Save model as model_epoch_01.h5, model_epoch_02.h5, etc.
    save_freq='epoch',                     # Save after every epoch
    save_weights_only=False,               # Save the full model
    verbose=1                              # Print when saving
)

# Train model
model.fit(
    train_generator,
    epochs=3,
    callbacks=[checkpoint]
)