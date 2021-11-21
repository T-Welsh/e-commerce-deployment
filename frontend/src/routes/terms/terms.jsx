import React, {Fragment, } from "react";
import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer";


const Terms = ({isAuthenticated, setAuth, setSearchTerm, setDepartment}) => {

    return (
        <Fragment>
            <Header isAuthenticated={isAuthenticated} setAuth={setAuth}  setSearchTerm={setSearchTerm} setDepartment={setDepartment}/>
            <h1>Terms and Conditions</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A diam maecenas sed enim ut sem viverra aliquet. Feugiat in fermentum posuere urna nec tincidunt praesent semper. Non enim praesent elementum facilisis leo. Mattis nunc sed blandit libero volutpat sed cras. Habitasse platea dictumst quisque sagittis purus sit. Orci a scelerisque purus semper eget duis at tellus at. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Venenatis lectus magna fringilla urna porttitor rhoncus. Duis at consectetur lorem donec massa sapien faucibus et. Augue lacus viverra vitae congue eu consequat ac felis donec. Tempus iaculis urna id volutpat lacus laoreet. Morbi non arcu risus quis varius quam quisque id diam. Duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Metus dictum at tempor commodo ullamcorper. Sed arcu non odio euismod lacinia at. Vestibulum lorem sed risus ultricies tristique nulla aliquet. Egestas erat imperdiet sed euismod. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat.
            </p>
            <p>
                Risus quis varius quam quisque id diam vel quam elementum. Nisi porta lorem mollis aliquam ut porttitor leo a diam. Ut placerat orci nulla pellentesque dignissim enim sit. Ridiculus mus mauris vitae ultricies leo integer. Massa sapien faucibus et molestie ac feugiat. Volutpat sed cras ornare arcu dui. Maecenas ultricies mi eget mauris pharetra. Elementum nisi quis eleifend quam adipiscing vitae proin. Quis varius quam quisque id diam. Diam ut venenatis tellus in metus vulputate eu scelerisque. Ac auctor augue mauris augue neque. Eu tincidunt tortor aliquam nulla facilisi cras fermentum odio eu.
            </p>
            <p>
                Aliquet lectus proin nibh nisl condimentum. Eget nullam non nisi est sit amet. Amet justo donec enim diam vulputate ut. Mauris a diam maecenas sed enim. Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Tellus in hac habitasse platea dictumst. Mauris pharetra et ultrices neque ornare aenean euismod elementum. Ut placerat orci nulla pellentesque dignissim enim sit amet. Aliquam id diam maecenas ultricies mi eget mauris pharetra et. Quis hendrerit dolor magna eget est lorem. Egestas integer eget aliquet nibh. Vitae proin sagittis nisl rhoncus mattis rhoncus urna. Sed turpis tincidunt id aliquet risus feugiat. Venenatis cras sed felis eget velit. Viverra nam libero justo laoreet sit amet cursus sit. Felis donec et odio pellentesque. Maecenas accumsan lacus vel facilisis volutpat est.
            </p>
            <p>
                Tellus id interdum velit laoreet id donec. Congue eu consequat ac felis donec et odio. Malesuada fames ac turpis egestas integer eget aliquet nibh. Nulla facilisi morbi tempus iaculis urna id volutpat. Nisl rhoncus mattis rhoncus urna neque. Velit sed ullamcorper morbi tincidunt ornare massa. Sit amet venenatis urna cursus eget nunc. Ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Amet nisl purus in mollis nunc. Purus faucibus ornare suspendisse sed nisi lacus sed viverra. Nibh cras pulvinar mattis nunc sed blandit libero volutpat sed. Egestas pretium aenean pharetra magna ac placerat vestibulum lectus mauris. Sagittis id consectetur purus ut faucibus. Purus in mollis nunc sed id semper risus. Suscipit tellus mauris a diam maecenas sed. Sit amet risus nullam eget. Ut tristique et egestas quis ipsum suspendisse. Sit amet risus nullam eget felis. Sit amet volutpat consequat mauris nunc. Bibendum enim facilisis gravida neque convallis a cras semper.
            </p>
            <p>
                Viverra nam libero justo laoreet. Condimentum vitae sapien pellentesque habitant morbi tristique senectus et netus. Sed cras ornare arcu dui vivamus arcu felis bibendum. Ut placerat orci nulla pellentesque dignissim enim. Felis donec et odio pellentesque diam volutpat commodo. Neque sodales ut etiam sit amet nisl purus in. Vestibulum lectus mauris ultrices eros in cursus turpis massa. Egestas sed sed risus pretium. Pellentesque diam volutpat commodo sed egestas. Sed egestas egestas fringilla phasellus. Orci a scelerisque purus semper eget.
            </p>
            <Footer isAuthenticated={isAuthenticated} setAuth={setAuth} setSearchTerm={setSearchTerm} setDepartment={setDepartment}></Footer>
        </Fragment>
    );
}; 

export default Terms;