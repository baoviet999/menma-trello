export const changeIndex = (array, dataIndex) => {
    const { addedIndex, payload, removedIndex } = dataIndex;
    const newArray = [...array];
    newArray[removedIndex] = newArray[addedIndex];
    newArray[addedIndex] = payload.id;
    return newArray;
};
