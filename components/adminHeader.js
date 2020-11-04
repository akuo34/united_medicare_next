import Link from 'next/link'

const AdminHeader = (props) => {
  return (
    <div style={{ "zIndex": "5" }}>
      <div className="toolbar-main admin">
        <div className="header-company">
          <Link href="http://52.8.24.75:3000">
            <a className="link trademark">United Medi-Care Inc.</a>
          </Link>
        </div>
        <div className="container-links">
          <Link href="http://52.8.24.75:3000/admin/about">
            <a className="link">About</a>
          </Link>
          <Link href="http://52.8.24.75:3000/admin/products">
            <a className="link">Products</a>
          </Link>
          <span onClick={props.logout} className="link">Logout</span>
        </div>
        <img onClick={props.toolbarHandler} className="hamburger" src="/hamburger_button_white.svg" alt="hamburger button" />
      </div>
      <div className={props.showToolbar ? "container-links-small-device" : "container-links-small-device hidden"}>
        <Link href="http://52.8.24.75:3000/admin/about">
          <a onClick={props.toolbarHandler} className="link dropdown">About</a>
        </Link>
        <Link href="http://52.8.24.75:3000/admin/products">
          <a onClick={props.toolbarHandler} className="link dropdown">Products</a>
        </Link>
        <span onClick={() => {props.logout(); props.toolbarHandler()}} className="link dropdown">Log out</span>
      </div>
    </div>
  )
}

export default AdminHeader;