declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}
declare module '*.module.css' {
  const classNames: {
    [className: string]: string
  }
  export = classNames
}

declare module '*.jpg'
declare module '*.png'
declare module '*.svg'
