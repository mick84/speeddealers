import styled from "styled-components";
import { palette } from "./palette";
export const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.color};
  color: white;
  font-size: 1.1rem;
  border: 1px solid white;
  // height: fit-content;
`;
export const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  background-color: ${(props) => props.color};
  gap: 1rem;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.color};
`;
const FormStyle = Card.withComponent("form");
export const Form = styled(FormStyle)`
  background-color: ${(props) => props.color};
  color: antiquewhite;
  border-radius: 0;
  width: min-content;
  justify-content: center;
`;
export const Inputblock = styled.div`
  border: 1px solid ${(props) => props.valid};
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  label {
    font-size: 1.2rem;
  }
  input {
    padding: 0.25rem 1rem;
    border-radius: 0.5rem;
    font-size: 1.1rem;
    width: 12rem;
  }
`;
export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  align-self: stretch;
`;
export const NavbarLayout = styled.nav`
  .logo {
    height: 4rem;
    width: 20rem;
    background-image: url("/horizontal-tr.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    flex-shrink: 0.25;
  }
  #nav-menu,
  #user-actions {
    display: flex;
    align-items: center;
    list-style-type: none;

    gap: 3vw;
    .nav-link {
      text-decoration: none;
      font-size: 1.3rem;
      font-weight: bold;
      line-height: 100%;
      color: ${palette.antiquewhite};

      &.active {
        border-bottom: 2px solid ${palette.razzmatazz};
      }
    }
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem;
  background-color: ${(props) => props.color};
  @media screen and (orientation: portrait) {
    & {
      flex-direction: column;
      .buttons,
      #nav-menu,
      #user-actions {
        flex-direction: column;
      }
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`;
export const ProfileLayout = styled(Card)`
  background-color: antiquewhite;
  font-size: 1.2rem;
  text-align: center;
  .picture {
    background-image: url(${(props) => props.imageurl});
    background-repeat: no-repeat;
    background-size: cover;
    width: 10rem;
    height: 10rem;
    border: 1px solid white;
  }
`;
export const CarCard = styled(Card)`
 
  font-size: 1.2rem;
  color: ${palette.antiquewhite};

  background-image: linear-gradient(
    to top right,

    ${palette.blackTr} 40%,
    ${palette.antiquewhite} 60%
  );
  background-size: 200%;
  //background-position: bottom left;
  transition: all 0.25s linear;

  &:hover {
    scale: 1.02;
    background-position: top right;
  }
  .top {
    display: flex;
    gap: 1rem;
    background-color: ${palette.blackTr};
    padding: 0.25rem;

    .logo {
      height: 5rem;
      width: 5rem;
      text-align: center;

      background-image: url(${(props) => props.logo});
      background-size: 100%;
      background-position: center;
      background-repeat: no-repeat;
    }
    .brand {
      font-size: 1.5em;
    }
    .model {
      font-size: 1.2em;
      text-align: center;
    }
  }

  .image {
    background-image: url(${(props) => props.image});
    background-size: cover;
    background-repeat: no-repeat;
    height: 10rem;
    aspect-ratio: 16 / 9;
  }
  .field {
    display: flex;
    justify-content: space-between;
  }
  .rental {
    .price {
      color: ${palette.limegreen};
    }
  }
`;
