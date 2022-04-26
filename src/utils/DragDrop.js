export const dragDrop = (array, dropResult) => {
    const result = [...array];
    const { addedIndex, removedIndex, payload } = dropResult;
    let itemToAdd = payload;
    // xóa cái mà mình drop vào xong trả cái phần tử đó ra biến itemToAdd
    if (removedIndex !== null) itemToAdd = result.splice(removedIndex, 1)[0];
    // lấy vị trí add và thêm cái phần tử add vào
    if (addedIndex !== null) result.splice(addedIndex, 0, itemToAdd);
    return result;
};
