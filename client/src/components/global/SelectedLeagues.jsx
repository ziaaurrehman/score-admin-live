import { TiArrowUnsorted } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { Reorder, useDragControls } from "framer-motion";

const SelectedLeagues = ({ leagues: initialLeague }) => {
  const controls = useDragControls();
  const [items, setItems] = useState(initialLeague);

  if (!initialLeague || initialLeague.length === 0) {
    return (
      <div className="bg-gray-100 p-5 min-h-screen">
        <h3 className="text-xl font-semibold text-red-300">
          Could not load the page...
        </h3>
      </div>
    );
  }
  const handleDelete = (index) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1); // Remove the item at the specified index
      return updatedItems;
    });
  };

  return (
    <main>
      <Reorder.Group values={items} onReorder={setItems}>
        {items.map((item, index) => (
          <Reorder.Item value={item} key={item}>
            <div
              key={index}
              className="mb-3 w-full bg-white rounded-md shadow-md p-4 flex justify-between items-center"
            >
              <div className="flex gap-3 items-center">
                <TiArrowUnsorted className="text-gray-500 text-xl cursor-pointer hover:text-gray-700 transition-colors" />
                <img
                  src="https://placehold.jp/150x150.png"
                  alt="league-icon"
                  className="rounded-full h-[30px] w-[30px]"
                />
                <h3 className="text-sm font-semibold">{item}</h3>
              </div>
              <MdDelete
                className="text-red-600 text-xl hover:text-red-900 transition-colors cursor-pointer"
                onClick={() => handleDelete(index)}
              />
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </main>
  );
};

export default SelectedLeagues;
