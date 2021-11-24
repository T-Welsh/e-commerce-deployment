import './returns.css';
import React, {Fragment, } from "react";
import Header from "../../components/header/Header.jsx";
import Footer from "../../components/footer/Footer";


const Returns = ({isAuthenticated, setAuth, setSearchTerm, setDepartment}) => {

    return (
        <Fragment>
            <Header isAuthenticated={isAuthenticated} setAuth={setAuth}  setSearchTerm={setSearchTerm} setDepartment={setDepartment}/>
            <body className="contentContainer">
                <div className="contentBody" id="returnsBody">
                    <h2 className="subHeadings" id="returnsPageHeading">Returns Policy</h2>
                    <section>
                        <h3>EXTENDED CHRISTMAS RETURNS POLICY</h3>
                        <p>
                            Tortor aliquam nulla facilisi cras. Leo in vitae turpis massa sed. Tincidunt dui ut ornare lectus sit amet est placerat. Non pulvinar neque laoreet suspendisse interdum. Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis. Lectus nulla at volutpat diam ut venenatis tellus in. Neque vitae tempus quam pellentesque nec nam. Orci nulla pellentesque dignissim enim. Cursus mattis molestie a iaculis at. Id aliquet risus feugiat in ante metus dictum. Nunc mi ipsum faucibus vitae aliquet. Metus vulputate eu scelerisque felis imperdiet proin fermentum. 
                        </p>
                    </section>
                    <section>
                        <h3>UNWANTED PURCHASES</h3>
                        <p>
                            Urna nunc id cursus metus. Sagittis vitae et leo duis ut diam. Porta non pulvinar neque laoreet suspendisse interdum consectetur libero id. Diam in arcu cursus euismod quis viverra nibh cras pulvinar. Arcu dui vivamus arcu felis bibendum ut tristique et. Viverra suspendisse potenti nullam ac. Pellentesque adipiscing commodo elit at imperdiet dui accumsan. Nunc faucibus a pellentesque sit amet porttitor. 
                        </p>
                    </section>
                    <section>
                        <h3>DAMAGED OR FAULTY ITEMS</h3>
                        <p>
                            Erat pellentesque adipiscing commodo elit at. Vitae turpis massa sed elementum tempus egestas sed sed. Egestas diam in arcu cursus euismod quis. Eget velit aliquet sagittis id consectetur. Consequat id porta nibh venenatis cras sed felis. Et malesuada fames ac turpis egestas sed tempus. Vitae congue eu consequat ac felis donec et odio.
                        </p>
                    </section>
                    <section>
                        <h3>HOW TO RETURN</h3>
                        <p>
                        Pellentesque adipiscing commodo elit at imperdiet. Morbi leo urna molestie at elementum eu. Morbi blandit cursus risus at ultrices. Pretium nibh ipsum consequat nisl vel pretium. Nulla facilisi cras fermentum odio eu. Convallis a cras semper auctor neque vitae tempus. Dolor magna eget est lorem ipsum dolor sit amet. Nunc sed id semper risus in hendrerit gravida. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Amet mattis vulputate enim nulla. Aliquam nulla facilisi cras fermentum odio eu feugiat pretium nibh.
                        </p>
                    </section>
                </div>
            </body> 
            <Footer isAuthenticated={isAuthenticated} setAuth={setAuth} setSearchTerm={setSearchTerm} setDepartment={setDepartment}></Footer>
        </Fragment>
    );
}; 

export default Returns;