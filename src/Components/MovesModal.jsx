import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";

const MovesModal = ({ showMovesModal, toggleMovesModal, testData }) => {
  return (
    <Modal
      show={showMovesModal}
      onClose={toggleMovesModal}
      size="xl"
      data-testid="moves-modal"
    >
      <ModalHeader>
        <div className="text-lg font-medium">
          All Moves ({testData.moves.length})
        </div>
      </ModalHeader>
      <ModalBody className="max-h-[60vh] overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {testData.moves.map((move, index) => (
            <span
              key={index}
              className="bg-gray-200 dark:bg-gray-600 dark:text-gray-100 px-3 py-1 rounded-full text-xs"
            >
              {move}
            </span>
          ))}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default MovesModal;
