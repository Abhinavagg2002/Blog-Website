import React,{useState} from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import EmailIllustrationSrc from "images/email-illustration.svg";
import CarImg from './Car1.webp';
import axios from "axios";
import ImageUploadButton from "Dashboard_2/Components/imageButton";

const Container = tw.div`max-h-screen bg-white text-white font-medium flex justify-center -mr-8 -ml-8 -mb-8 mt-3`;
const TwoColumn = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1 border border-primary-900 px-5 py-4`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,  
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const Textarea = styled(Input).attrs({as: "textarea"})`
  ${tw`h-24`}
`

const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8`

const AccidentDetection= () => {
  const subheading = "Upload the image using this upload image button";
  const heading = <>Accident Detection</>;
  const submitButtonText = "Send";
  const formAction = "#";
  const formMethod = "get";
  const textOnLeft = true;

  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleImageUpload = (e) => {
    const formData = new FormData();
    formData.append('image', image);

    axios.post('http://localhost:4000/accident', formData)
      .then(response => {
        console.log(response.data);
        // Handle the response as needed
      })
      .catch(error => {
        console.error('Error uploading video:', error);
      });
  };

  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.

  return (
    <Container>
      <TwoColumn>
        <ImageColumn>
          <Image imageSrc={CarImg} />
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            <Heading>{heading}</Heading>
            <br/>
            {subheading && <Subheading>{subheading}</Subheading>}
            <div>
              <h1>Image Upload</h1>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              <button onClick={handleImageUpload}>Upload Image</button>
            </div>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};

export default AccidentDetection;