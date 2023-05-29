import './content-container.css'

const ContentContainer = ({ className, title, subtitle, savable, children, submitHandler }: { className?: string, title: string, subtitle: string, savable?: boolean, children: any, submitHandler?: any }) => {
  return <div className={`content-container ${className}`}>
    <div className='header'>
      <div>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
      {savable && <a href="">Save</a>}
    </div>
    <form onSubmit={submitHandler} className='body'>
      {children}
    </form>
  </div>
}

export default ContentContainer;