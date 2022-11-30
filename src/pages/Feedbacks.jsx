import { Container, Page } from "../styles/components";

import styled from "styled-components";
import { palette } from "../styles/palette";
export default function Feedbacks(props) {
  return (
    <Page style={{ backgroundImage: `url('/carbon large.jpg')` }}>
      <Container>
        <Feedback username={"Mick"} rating={10}></Feedback>
      </Container>
    </Page>
  );
}

export const Feedback = (props) => {
  return (
    <FeedbackLayout>
      <div className="username">Name: {props.username}</div>
      <div className="rating">Rating: {props.rating}</div>
      <div className="comment">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
        accusantium labore debitis sequi laborum itaque, neque dignissimos
        mollitia expedita dolores! Dolorem omnis debitis, rerum eius dolor
        impedit molestias corporis nesciunt! Magnam nisi, assumenda laboriosam
        pariatur fugiat laudantium ab, ipsa illo maiores vel modi, sint odio
        soluta voluptate recusandae eveniet. Tempora voluptates quod, eius
        aspernatur eveniet modi. Necessitatibus sit debitis quia! Vel adipisci
        maxime veritatis. Temporibus repudiandae eveniet nostrum dolores,
        cupiditate qui saepe vero asperiores commodi enim accusamus dolorum
        reiciendis deserunt ullam quas voluptas. Nemo odit deserunt earum sit
        numquam molestias! Voluptatum obcaecati, ipsam vitae reprehenderit quae
        cum in quasi Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Inventore placeat neque impedit recusandae hic exercitationem pariatur
        cupiditate perferendis fuga libero perspiciatis cumque sint minima iste
        odit harum, molestias, aperiam, quae vero nesciunt autem. Maxime
        perferendis repellat nisi. Velit consequatur dignissimos aperiam
        recusandae iusto explicabo facere odio odit consequuntur! Dolor,
        doloribus.
      </div>
    </FeedbackLayout>
  );
};
export const FeedbackLayout = styled.div`
  background-color: ${palette.blackTr};
  color: ${palette.antiquewhite};
  padding: 1rem;

  border-left: 2px solid ${palette.limegreen};
  margin: 1rem;
  .comment {
  }
`;
