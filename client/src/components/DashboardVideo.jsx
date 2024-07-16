import { useState } from "react";
import PropTypes from "prop-types";
import { Cell, Row } from "react-aria-components";

export default function DashboardVideo( {video} ) {

  const [showAllTags, setShowAllTags] = useState(false);

  const handleButtonClick = () => {
    setShowAllTags(!showAllTags);
  };

  const newDateVideo = video.upload_date.split("T")[0]

  const tagsArray = video.tags.split(",")

 return (
    <Row className="[&>*]:border-2 [&>*]:px-2 lg:[&>*]:px-0">
      <Cell className="px-0">
        <img
          src="../src/assets/images/pilat.jpg"
          alt=""
          className="w-36 inline float-left"
        />
        <p className="block text-ellipsis pt-10"> {video.title} </p>
      </Cell>
      <Cell> {video.category_name} </Cell>
      <Cell className="py-2 px-0">
        <ul className="flex flex-wrap w-auto justify-center items-center gap-4 [&>*]:py-0 [&>*]:px-4 [&>*]:text-xl [&>*]:h-7 [&>*]:bg-[var(--primaryColor)] [&>*]:rounded-full [&>*]:text-[var(--darkColor)] [&>*]:capitaliz [&>*]:my-1 [&>*]:border-2 [&>*]:border-dark-color">
        {(showAllTags ? tagsArray : tagsArray.slice(0, 3)).map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        {tagsArray.length > 3 && (
          <button
            type="button"
            className="bg-inherit hover:bg-inherit hover:text-black font-thin pt-3 textHoverUnderline"
            onClick={handleButtonClick}
          >
            {showAllTags ? "Afficher moins" : "Afficher plus"}
          </button>
        )}
      </Cell>
      <Cell> {video.access} </Cell>
      <Cell> {newDateVideo} </Cell>
      <Cell>
        <ul className="flex flex-col gap-4">
          <li>
            <button type="button" className="textHoverUnderline">
              Modifier
            </button>
          </li>
          <li>
            <button type="button" className="textHoverUnderline">
              Supprimer
            </button>
          </li>
        </ul>
      </Cell>
    </Row>
  );
}
DashboardVideo.propTypes = {
  video: PropTypes.shape({
    upload_date: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category_name: PropTypes.string.isRequired,
    access: PropTypes.string.isRequired,
  }).isRequired,
};