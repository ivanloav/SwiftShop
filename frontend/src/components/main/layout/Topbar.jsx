import "./Topbar.css";
import logo from "/logo.png";


export function Topbar(){
    return (
      <div className="head flex">
        <div className=" logo">
          <img src={logo} />
        </div>
        <div className="title flex">Title</div>
        <div className="configButtons flex ">
          <i className="bi bi-gear-fill"></i>
          <i className="bi bi-bell-fill"></i>
          <i className="bi bi-chat-fill"></i>
        </div>
      </div>
    );

}