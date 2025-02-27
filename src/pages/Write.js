import React from "react";
import CustomButton from "../components/CustomButton";
import styled from "styled-components";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";
import { __createPlans } from "../redux/modules/plansSlicer";
import { useNavigate } from "react-router-dom";
import useIP from "../components/hooks/useIP";

const ContentBox = styled.div`
  /* width: 70%; */
  height: 600px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  justify-content: flex-start;
  border-radius: 30px;
  gap: 10px;
`;

const ContentLiner = styled.div`
  width: 78%;
  height: 15%;
  margin: 20px auto;

  .CL_label {
    width: inherit;
    height: 50%;
    margin-bottom: 10px;
  }
  .CL_content {
    width: 100%;
    padding-left: 3%;
    height: 50%;
    font-size: 20px;
    border: 1px solid silver;
    border-radius: 20px;
  }
`;
const ContentTextArea = styled.textarea`
  width: 80%;
  height: 59%;

  background: repeating-linear-gradient(red, red 1px, 0, yellow 20px);
  max-height: 800px;
  border: 1px solid black;
  border-radius: 20px;
  margin: 0 auto;
  padding: 3%;
  display: flex;
`;
//css
const Write = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [post, writeHandler] = useIP({
    name: "",
    title: "",
    body: "",
  });

  function createHandler() {
    if (post.name.trim() === "") {
      alert("닉네임이 비어져 있습니다!");
    } else if (post.title.trim() === "") {
      alert("제목이 비어져 있습니다!");
    } else if (post.body.trim() === "") {
      alert("내용이 비어져 있습니다!");
    } else {
      dispatch(__createPlans(post));
      navigate("/");
    }
  }

  const buttonCss =
    "font-size: 18px; width : 20%; height : fit-content;  border : none; margin : 20px   auto;" +
    "background: black; color : orange; border-radius :20px; ";

  const hoverCss = "background-color:#FF5F00; color:black; transition: 0.7s;";
  return (
    <Layout>
      <Header />
      <ContentBox>
        <div>
          <ContentLiner>
            <div className="CL_label">작성자 : </div>
            <input
              type="text"
              name="name"
              className="CL_content"
              value={post.name}
              onChange={writeHandler}
              // onChange={(e) => {
              //   const { value } = e.target;
              //   setPost({
              //     ...post,
              //     name: value,
              //   });
              // }}
            ></input>
          </ContentLiner>
          <ContentLiner>
            <div>
              <div className="CL_label">제목 :</div>
              <input
                type="text"
                name="title"
                className="CL_content"
                value={post.title}
                onChange={writeHandler}
                // onChange={(e) => {
                //   const { value } = e.target;
                //   setPost({
                //     ...post,
                //     title: value,
                //   });
                // }}
              ></input>
            </div>
          </ContentLiner>
        </div>
        <ContentTextArea
          name="body"
          value={post.body}
          onChange={writeHandler}
          // onChange={(e) => {
          //   const { value } = e.target;
          //   setPost({
          //     ...post,
          //     body: value,
          //   });
          // }}
        ></ContentTextArea>
        <CustomButton
          value="글쓰기"
          css={buttonCss}
          hover={hoverCss}
          onClick={() => {
            createHandler();
          }}
        ></CustomButton>
      </ContentBox>
    </Layout>
  );
};

export default Write;
