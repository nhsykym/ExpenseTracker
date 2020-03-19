import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <div className="sticky-top">
        <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div className="container">
                <Link className="navbar-brand" to="/">家計簿アプリ</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link mx-2" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mx-2" to="/list">List</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mx-2" to="/create">+ 新規追加</Link>
                        </li>
                        <li className="nav-item">
                        {/* ログイン状態で表示を変える */}
                            {props.isAuthenticated ?
                                <a href="#" onClick={props.logout}>Logout</a>
                            :
                                <Link className="nav-link mx-2" to="/signin">SignIn</Link>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
  );
};

export default Header;
