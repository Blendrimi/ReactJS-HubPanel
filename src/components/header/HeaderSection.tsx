import { useEffect, useRef, useState } from "react";
type Props = {
  toggleSidebarOpen: () => void;
};
const HeaderSection = ({ toggleSidebarOpen }: Props) => {
  const [activeDropdown, setActiveDropdown] = useState<string>("");

  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown("");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? "" : dropdown);
  };

  return (
    <header
      className="top-header-area d-flex align-items-center justify-content-between"
      id="stickyHeader"
    >
      <div className="left-side-content-area d-flex align-items-center">
        <div
          className="mobile-menu-icon d-md-none"
          id="mobileMenuIcon"
          role="button"
          onClick={toggleSidebarOpen}
        >
          <i className="ti ti-menu-deep"></i>
        </div>

        <div className="top-bar-text d-none d-lg-block">
          <h4 className="mb-1 text-white">Dashboard</h4>
          <p className="mb-0 text-white text-uppercase opacity-75">
            Home - Courier System
          </p>
        </div>
      </div>

      <div className="right-side-navbar d-flex align-items-center justify-content-end">
        <ul
          className="ps-0 right-side-content d-flex align-items-center"
          ref={dropdownRef}
        >
          <div className="top-search-bar">
            <form action="#" method="get">
              <input
                className="from-control top-search mb-0"
                name="search"
                placeholder="Search"
                type="search"
                onFocus={() => toggleDropdown("")}
              />
              <button className="" type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill="none"
                >
                  <path
                    d="M12.0273 6.09848C12.0273 9.05221 9.51995 11.497 6.36364 11.497C3.20732 11.497 0.7 9.05221 0.7 6.09848C0.7 3.14476 3.20732 0.7 6.36364 0.7C9.51995 0.7 12.0273 3.14476 12.0273 6.09848Z"
                    stroke="white"
                    strokeWidth="1.4"
                  />
                  <line
                    x1="0.7"
                    y1="-0.7"
                    x2="4.58843"
                    y2="-0.7"
                    transform="matrix(-0.721988 -0.691905 0.721988 -0.691905 14 13.4167)"
                    stroke="white"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </form>
          </div>

          <li className="nav-item dropdown">
            <button
              className={`btn dropdown-toggle ${
                activeDropdown === "msg" ? "show" : ""
              }`}
              onClick={() => toggleDropdown("msg")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <path
                  d="M7.79165 17.4166H7.33331C3.66665 17.4166 1.83331 16.5 1.83331 11.9166V7.33331C1.83331 3.66665 3.66665 1.83331 7.33331 1.83331H14.6666C18.3333 1.83331 20.1666 3.66665 20.1666 7.33331V11.9166C20.1666 15.5833 18.3333 17.4166 14.6666 17.4166H14.2083C13.9241 17.4166 13.6491 17.5541 13.475 17.7833L12.1 19.6166C11.495 20.4233 10.505 20.4233 9.89998 19.6166L8.52498 17.7833C8.37831 17.5816 8.03915 17.4166 7.79165 17.4166Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.41669 7.33331H15.5834"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.41669 11.9167H11.9167"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div
              className={`dropdown-menu notifications-box dropdown-menu-end ${
                activeDropdown === "msg" ? "show" : ""
              }`}
            >
              <a className="dropdown-item" href="#">
                <i className="ti ti-percentage"></i>
                <span>Your commissions has been sent</span>
              </a>
              <a className="dropdown-item" href="#">
                <i className="ti ti-alert-triangle bg-warning"></i>
                <span>Security alert for your linked Google account</span>
              </a>
              <a className="dropdown-item" href="#">
                <i className="ti ti-percentage"></i>
                <span>Your commissions has been sent</span>
              </a>
            </div>
          </li>

          <li className="nav-item dropdown">
            <button
              className={`btn dropdown-toggle ${
                activeDropdown === "notification" ? "show" : ""
              }`}
              onClick={() => toggleDropdown("notification")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <path
                  d="M11 5.90332V8.95582"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                />
                <path
                  d="M11.0184 1.83331C7.64503 1.83331 4.91336 4.56498 4.91336 7.93831V9.86331C4.91336 10.4866 4.6567 11.4216 4.33586 11.9533L3.1717 13.8966C2.4567 15.0975 2.95169 16.4358 4.27169 16.8758C8.65336 18.3333 13.3925 18.3333 17.7742 16.8758C19.0117 16.4633 19.5434 15.015 18.8742 13.8966L17.71 11.9533C17.3892 11.4216 17.1325 10.4775 17.1325 9.86331V7.93831C17.1234 4.58331 14.3734 1.83331 11.0184 1.83331Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                />
                <path
                  d="M14.0525 17.2516C14.0525 18.9291 12.6775 20.3041 11 20.3041C10.1658 20.3041 9.39584 19.9558 8.84584 19.4058C8.29584 18.8558 7.94751 18.0858 7.94751 17.2516"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                />
              </svg>
            </button>

            <div
              className={`dropdown-menu dropdown-menu-end ${
                activeDropdown === "notification" ? "show" : ""
              }`}
            >
              <div className="notifications-box" id="notificationsBox">
                <a className="dropdown-item" href="#">
                  <i className="ti ti-box bg-success"></i>
                  <span>We've got something for you!</span>
                </a>
                <a className="dropdown-item" href="#">
                  <i className="ti ti-alert-triangle bg-danger"></i>
                  <span>Domain names expiring on Tuesday</span>
                </a>
                <a className="dropdown-item" href="#">
                  <i className="ti ti-percentage"></i>
                  <span>Your commissions has been sent</span>
                </a>
                <a className="dropdown-item" href="#">
                  <i className="ti ti-alert-triangle bg-warning"></i>
                  <span>Security alert for your linked Google account</span>
                </a>
                <a className="dropdown-item" href="#">
                  <i className="ti ti-alert-triangle bg-danger"></i>
                  <span>Domain names expiring on Tuesday</span>
                </a>
              </div>
            </div>
          </li>

          <li className="nav-item dropdown">
            <button
              className={`btn dropdown-toggle ${
                activeDropdown === "profile" ? "show" : ""
              }`}
              onClick={() => toggleDropdown("profile")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="46"
                height="46"
                viewBox="0 0 46 46"
                fill="none"
              >
                <path
                  d="M24.7267 22.6809H24.7267C24.769 22.6804 24.8127 22.6815 24.8569 22.6846M24.7267 22.6809L24.8039 23.4327M24.7267 22.6809C24.6479 22.6817 24.6138 22.6835 24.5924 22.6846C24.5723 22.6857 24.5632 22.6861 24.5389 22.6848C22.1074 22.5495 20.2735 20.6095 20.2735 18.225C20.2735 15.7572 22.2807 13.75 24.7485 13.75C27.2158 13.75 29.2227 15.7564 29.2235 18.2236M24.7267 22.6809L29.2235 18.2236M24.8569 22.6846L24.8039 23.4327M24.8569 22.6846L24.8569 22.6846L24.8039 23.4327M24.8569 22.6846L24.8895 22.687L24.9098 22.6886C24.9132 22.6888 24.9155 22.6889 24.9167 22.689M24.8039 23.4327C24.8123 23.4333 24.8207 23.434 24.8292 23.4346C24.8572 23.4368 24.8853 23.439 24.9135 23.439H24.9355M24.9167 22.689H24.9167H24.9166H24.9166H24.9165H24.9165H24.9164H24.9164H24.9163H24.9163H24.9162H24.9162H24.9161H24.916H24.916H24.9159H24.9159H24.9158H24.9158H24.9157H24.9157H24.9156H24.9156H24.9155H24.9154H24.9154H24.9153H24.9153H24.9152H24.9152H24.9151H24.915H24.915H24.9149H24.9149H24.9148H24.9147H24.9147H24.9146H24.9146H24.9145H24.9144H24.9144H24.9143H24.9143H24.9142H24.9141H24.9141H24.914H24.9139H24.9139H24.9138H24.9138H24.9137H24.9136H24.9136H24.9135C24.9162 22.689 24.9178 22.6891 24.9178 22.6891C24.9178 22.6891 24.9175 22.689 24.9167 22.689ZM24.9167 22.689H24.9167H24.9168H24.9168H24.9169H24.9169H24.917H24.917H24.9171H24.9172H24.9172H24.9173H24.9173H24.9174H24.9174H24.9174H24.9175H24.9175H24.9176H24.9176H24.9177H24.9177H24.9178H24.9178H24.9179H24.9179H24.918H24.918H24.9181H24.9181H24.9182H24.9182H24.9183H24.9183H24.9184H24.9184H24.9184H24.9185H24.9185H24.9186H24.9186H24.9187H24.9187H24.9188H24.9188H24.9188H24.9189H24.9189H24.919H24.919H24.9191H24.9191H24.9192H24.9192H24.9192H24.9193H24.9193H24.9194H24.9194H24.9195H24.9195H24.9195H24.9196H24.9196H24.9197H24.9197H24.9197H24.9198H24.9198H24.9199H24.9199H24.9199H24.92H24.92H24.9201H24.9201H24.9201H24.9202H24.9202H24.9203H24.9203H24.9203H24.9204H24.9204H24.9205H24.9205H24.9205H24.9206H24.9206H24.9207H24.9207H24.9207H24.9208H24.9208H24.9208H24.9209H24.9209H24.921H24.921H24.921H24.9211H24.9211H24.9211H24.9212H24.9212H24.9213H24.9213H24.9213H24.9214H24.9214H24.9214H24.9215H24.9215H24.9216H24.9216H24.9216H24.9217H24.9217H24.9217H24.9218H24.9218H24.9218M24.9218 22.689C24.9191 22.6891 24.9163 22.6892 24.9135 22.6893C24.912 22.6894 24.9106 22.6894 24.9091 22.6895L24.9135 22.8132L24.9355 23.439M24.9218 22.689C27.3266 22.5978 29.2133 20.6449 29.2235 18.2236M24.9218 22.689H24.9219H24.9219H24.9219H24.922H24.922H24.922H24.9221H24.9221H24.9222H24.9222H24.9222H24.9223H24.9223H24.9223H24.9224H24.9224H24.9224H24.9225H24.9225H24.9225H24.9226H24.9226H24.9226H24.9227H24.9227H24.9227H24.9228H24.9228H24.9228H24.9229H24.9229H24.9229H24.923H24.923H24.923H24.9231H24.9231H24.9231H24.9232H24.9232H24.9232H24.9233H24.9233H24.9233H24.9234H24.9234H24.9234H24.9235H24.9235H24.9235H24.9236H24.9236H24.9236H24.9237H24.9237H24.9237H24.9238H24.9238H24.9238H24.9239H24.9239H24.9239H24.9239H24.924H24.924H24.924H24.9241H24.9241H24.9241H24.9242H24.9242H24.9242H24.9243H24.9243H24.9243H24.9244H24.9244H24.9244H24.9245H24.9245H24.9245H24.9246H24.9246H24.9246H24.9247H24.9247H24.9247H24.9248H24.9248H24.9248H24.9249H24.9249H24.9249H24.925H24.925H24.925H24.925H24.9251H24.9251H24.9251H24.9252H24.9252H24.9252H24.9253H24.9253H24.9253H24.9254H24.9254H24.9254H24.9255H24.9255H24.9255H24.9256H24.9256H24.9256H24.9257H24.9257H24.9257H24.9258H24.9258H24.9258H24.9259H24.9259H24.9259H24.926H24.926H24.926H24.9261H24.9261H24.9261H24.9262H24.9262H24.9262H24.9263H24.9263H24.9263H24.9264H24.9264H24.9264H24.9265H24.9265H24.9265H24.9266H24.9266H24.9266H24.9267H24.9267H24.9267H24.9268H24.9268H24.9268H24.9269H24.9269H24.9269H24.927H24.927H24.9271H24.9271H24.9271H24.9272H24.9272H24.9272H24.9273H24.9273H24.9273H24.9274H24.9274H24.9274H24.9275H24.9275H24.9276H24.9276H24.9276H24.9277H24.9277H24.9277H24.9278H24.9278H24.9278H24.9279H24.9279H24.928H24.928H24.928H24.9281H24.9281H24.9281H24.9282H24.9282H24.9283H24.9283H24.9283H24.9284H24.9284H24.9285H24.9285H24.9285H24.9286H24.9286H24.9286H24.9287H24.9287H24.9288H24.9288H24.9288H24.9289H24.9289H24.929H24.929H24.929H24.9291H24.9291H24.9292H24.9292H24.9293H24.9293H24.9293H24.9294H24.9294H24.9295H24.9295H24.9295H24.9296H24.9296H24.9297H24.9297H24.9298H24.9298H24.9298H24.9299H24.9299H24.93H24.93H24.9301H24.9301H24.9301H24.9302H24.9302H24.9303H24.9303H24.9304H24.9304H24.9305H24.9305H24.9306H24.9306H24.9306H24.9307H24.9307H24.9308H24.9308H24.9309H24.9309H24.931H24.931H24.9311H24.9311H24.9312H24.9312H24.9313H24.9313H24.9314H24.9314H24.9314H24.9315H24.9315H24.9316H24.9316H24.9317H24.9317H24.9318H24.9318H24.9319H24.9319H24.932H24.932H24.9321H24.9322H24.9322H24.9323H24.9323H24.9324H24.9324H24.9325H24.9325H24.9326H24.9326H24.9327H24.9327H24.9328H24.9328H24.9329H24.9329H24.933H24.9331H24.9331H24.9332H24.9332H24.9333H24.9333H24.9334H24.9334H24.9335H24.9336H24.9336H24.9337H24.9337H24.9338H24.9338H24.9339H24.934H24.934H24.9341H24.9341H24.9342H24.9343H24.9343H24.9344H24.9344H24.9345H24.9346H24.9346H24.9347H24.9347H24.9348H24.9349H24.9349H24.935H24.9351H24.9351H24.9352H24.9352H24.9353H24.9354H24.9354H24.9355V23.439M24.9355 23.439L29.2235 18.2236"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <path
                  d="M19.5741 32.8263L19.5721 32.825C18.3377 32.002 17.7501 30.9586 17.7501 29.918C17.7501 28.8768 18.3382 27.8228 19.5826 26.9894C20.9805 26.0647 22.8518 25.5805 24.7578 25.5805C26.6648 25.5805 28.5301 26.0651 29.916 26.989C31.145 27.8084 31.7284 28.8513 31.7381 29.899C31.7369 30.9503 31.1485 31.9932 29.9134 32.8267C28.5222 33.7607 26.6522 34.25 24.7441 34.25C22.8356 34.25 20.9655 33.7605 19.5741 32.8263Z"
                  stroke="white"
                  strokeWidth="1.5"
                />
              </svg>
            </button>

            <div
              className={`dropdown-menu dropdown-menu-end ${
                activeDropdown === "profile" ? "show" : ""
              }`}
            >
              <div className="user-profile-area">
                <a className="dropdown-item" href="#">
                  <i className="ti ti-user"></i> My profile
                </a>
                <a className="dropdown-item" href="#">
                  <i className="ti ti-settings"></i> Account settings
                </a>
                <a className="dropdown-item" href="#">
                  <i className="ti ti-heart"></i> Support
                </a>
                <a className="dropdown-item" href="#">
                  <i className="ti ti-lock"></i> Logout
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};
export default HeaderSection;
