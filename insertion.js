async function insertion() {
    console.log('In insertion()');
    const ele = document.querySelectorAll(".bar");
    // color
    ele[0].style.background = 'green';
    for (let i = 1; i < ele.length; i++) {
        // console.log('In ith loop');
        let j = i - 1;
        let key = ele[i].style.height;
        // color
        ele[i].style.background = 'blue';

        await waitforme(delay);

        while (j >= 0 && (parseInt(ele[j].style.height) > parseInt(key))) {
            // console.log('In while loop');
            // color
            // Here blue denotes that the key element might sit there
            ele[j].style.background = 'blue';
            ele[j + 1].style.height = ele[j].style.height;
            j--;

            await waitforme(delay);

            // color
            // The positions in the sorted area of the array, where the key element might not be there has to be coloured as green again.
            for (let k = i; k >= 0; k--) {
                ele[k].style.background = 'green';
            }
        }
        // Placing the key element in its appropriate place in sorted portion
        ele[j + 1].style.height = key;
        // color
        // if the compiler doesnot go inside the above loop, then the green color will not be given to the key element because the last for loop in the while loop was never visited. That is why this below line was included
        ele[i].style.background = 'green';
    }
}

const inSortbtn = document.querySelector(".insertionSort");
inSortbtn.addEventListener('click', async function () {
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await insertion();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});