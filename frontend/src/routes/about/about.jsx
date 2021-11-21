import React, {Fragment, } from "react";
import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer";


const About = ({isAuthenticated, setAuth, setSearchTerm, setDepartment}) => {

    return (
        <Fragment>
            <Header isAuthenticated={isAuthenticated} setAuth={setAuth}  setSearchTerm={setSearchTerm} setDepartment={setDepartment}/>
            <h1>About</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A diam maecenas sed enim ut sem viverra aliquet. Feugiat in fermentum posuere urna nec tincidunt praesent semper. Non enim praesent elementum facilisis leo. Mattis nunc sed blandit libero volutpat sed cras. Habitasse platea dictumst quisque sagittis purus sit. Orci a scelerisque purus semper eget duis at tellus at. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Venenatis lectus magna fringilla urna porttitor rhoncus. Duis at consectetur lorem donec massa sapien faucibus et. Augue lacus viverra vitae congue eu consequat ac felis donec. Tempus iaculis urna id volutpat lacus laoreet. Morbi non arcu risus quis varius quam quisque id diam. Duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Metus dictum at tempor commodo ullamcorper. Sed arcu non odio euismod lacinia at. Vestibulum lorem sed risus ultricies tristique nulla aliquet. Egestas erat imperdiet sed euismod. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat.
            </p>
            <p>
                Risus quis varius quam quisque id diam vel quam elementum. Nisi porta lorem mollis aliquam ut porttitor leo a diam. Ut placerat orci nulla pellentesque dignissim enim sit. Ridiculus mus mauris vitae ultricies leo integer. Massa sapien faucibus et molestie ac feugiat. Volutpat sed cras ornare arcu dui. Maecenas ultricies mi eget mauris pharetra. Elementum nisi quis eleifend quam adipiscing vitae proin. Quis varius quam quisque id diam. Diam ut venenatis tellus in metus vulputate eu scelerisque. Ac auctor augue mauris augue neque. Eu tincidunt tortor aliquam nulla facilisi cras fermentum odio eu.
            </p>
            <Footer isAuthenticated={isAuthenticated} setAuth={setAuth} setSearchTerm={setSearchTerm} setDepartment={setDepartment}></Footer>
        </Fragment>
    );
}; 

export default About;