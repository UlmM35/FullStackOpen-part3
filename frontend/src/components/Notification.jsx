const Notification = ({ message, type}) => {
  let messageStyle = "added"
  if (message === null) {
    return null
  }
  if (type === 'error') {
    messageStyle = "error"
  }

  return (
    <div className={messageStyle}>
      {message}
    </div>
  )
}

export default Notification