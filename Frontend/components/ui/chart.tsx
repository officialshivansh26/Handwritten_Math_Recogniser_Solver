import type * as React from "react"

const Chart = ({ children, ...props }: React.PropsWithChildren<any>) => {
  return <div {...props}>{children}</div>
}

const ChartContainer = ({ children, ...props }: React.PropsWithChildren<any>) => {
  return <div {...props}>{children}</div>
}

const ChartTooltip = ({ children, ...props }: React.PropsWithChildren<any>) => {
  return <div {...props}>{children}</div>
}

const ChartTooltipContent = ({ ...props }: any) => {
  return <div {...props}>Tooltip Content</div>
}

const ChartLegend = ({ children, ...props }: React.PropsWithChildren<any>) => {
  return <div {...props}>{children}</div>
}

const ChartLegendItem = ({ name, color, ...props }: any) => {
  return <div {...props}>{name}</div>
}

const ChartGrid = ({ ...props }: any) => {
  return <div {...props}></div>
}

const ChartLine = ({ ...props }: any) => {
  return <div {...props}></div>
}

const ChartLineSeries = ({ ...props }: any) => {
  return <div {...props}></div>
}

const ChartYAxis = ({ ...props }: any) => {
  return <div {...props}></div>
}

const ChartXAxis = ({ ...props }: any) => {
  return <div {...props}></div>
}

const ChartBar = ({ ...props }: any) => {
  return <div {...props}></div>
}

const ChartBarSeries = ({ ...props }: any) => {
  return <div {...props}></div>
}

export {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
  ChartGrid,
  ChartLine,
  ChartLineSeries,
  ChartYAxis,
  ChartXAxis,
  ChartBar,
  ChartBarSeries,
}

