import { useState } from "react";

const useCreators = () => {
  const [creators, setCreators] = useState([
    { id: 1, username: "Marko Jovanović", podcasts: 1 },
    { id: 2, username: "Ana Petrović", podcasts: 1 },
    { id: 3, username: "Milan Nikolić", podcasts: 1 },
    { id: 4, username: "Ivana Ilić", podcasts: 1 },
  ]);

  const [selectedCreator, setSelectedCreator] = useState(null);

  const handleRemoveClick = (creator) => {
    setSelectedCreator(creator);
  };

  const confirmRemove = () => {
    setCreators((prev) => prev.filter((creator) => creator.id !== selectedCreator.id));
    setSelectedCreator(null);
  };

  const cancelRemove = () => {
    setSelectedCreator(null);
  };

  return {
    creators, 
    selectedCreator, 
    handleRemoveClick,
    confirmRemove,
    cancelRemove,
  };
};

export default useCreators;
