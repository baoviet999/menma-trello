// sắp xếp 1 aray dựa trên 1 array khác

export const sortOrder = (array: any[], order: any[], key: any) => {
    return array.sort((a, b) => order.indexOf(a[key]) - order.indexOf(b[key]));
};
