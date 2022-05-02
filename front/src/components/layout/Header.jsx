import React, {Fragment, useEffect} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {logoutUserReducer} from "../../lib/redux/user/userReducer";


export default function Header(props) {
  const {isLogged, infos} = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(infos)
  }, [isLogged])


  return (
    <Container>
      <LogoContainer>
        <span>Stack<strong>OverFlou</strong> </span>
      </LogoContainer>
      {isLogged ? (
        <NavContainer>
          <NavLink to='/'>Accueil</NavLink>
          <NavLink to='/topics'>Topics</NavLink>
          <NavLink to='/profil'>Profil</NavLink>
        </NavContainer>
      ): (
        <NavContainer>
          <NavLink to='/register'>S'enregistrer</NavLink>
          <NavLink to='/login'>Se Connecter</NavLink>
        </NavContainer>
      )}
      <ConnectionContainer>
        {isLogged && (
          <Fragment>
            <div className="infoUser">
              {isLogged && infos.nickName}
            </div>
            <NavLink
              to='/'
              className='logout'
              onClick={ e => {
                e.preventDefault()
                localStorage.removeItem('stackoverflou-token')
                dispatch(logoutUserReducer())
              }}
            >Log Out</NavLink>
          </Fragment>
        )}
      </ConnectionContainer>

    </Container>
  );
}

// ---- Styled

const Container = styled.div`
  font-family: 'Liberation Sans', sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background: #f8f9f9;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  z-index: 100;
`;

const LogoContainer = styled.div`
font-family: Roboto, sans-serif;
  display: flex;
  align-items: center;
  
  span {
    margin-left: 0.5em;
  }
`;

const NavContainer = styled.nav`
  width: 50%;
  display: flex;
  justify-content: space-around;
  
  a{
    text-decoration: none;
    margin: 0 10px;
    padding: 10px 15px;
    border-radius: 999px;
    background: #f1f1f1;
    color: #5c6269;
    transition: .2s linear;
    
    &:hover{
      background: #babfc4;
      color: #fff;
    }
  }
`;

const ConnectionContainer = styled.div`
  display: flex;
  margin: 0 15px;
  
  .infoUser{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    margin: 0 10px;
  }
  
  a {
    padding: 8px 10px;
    margin: 0 10px;
    min-width: 60px;
    cursor: pointer;
    border: .5px solid #4fa8e0;
    border-radius: 3px;
    text-decoration: none;
    font-size: 12px;
  }
  
  .logout{
    color: #4fa9e0;
    background: #e1ecf4;
    border: .5px solid #4fa9e0;
    border-radius: 3px;
    
    &:hover{
      background: #b3d3ea;
      color: #3a739c;
    }
  }
`;
