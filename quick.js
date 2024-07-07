async function partitionLomuto(ele, l, r) {
    let i = l - 1;
    // color pivot element
    ele[r].style.background = 'red';
    for (let j = l; j <= r - 1; j++) {
        // color current element
        ele[j].style.background = 'yellow';
        // pauseChamp
        await waitforme(delay);

        if (parseInt(ele[j].style.height) < parseInt(ele[r].style.height)) {
            i++;
            swap(ele[i], ele[j]);
            // color ele[j] with orange because it's smaller than pivot
            ele[i].style.background = 'orange';
            // color the ith element only if (i!=j) with pink since it is greater than pivot
            if (i != j) ele[j].style.background = 'pink';
            // pause
            await waitforme(delay);
        }
        else {
            // color if not less than pivot
            ele[j].style.background = 'pink';
        }
    }
    i++;
    // pause
    await waitforme(delay);
    swap(ele[i], ele[r]); // pivot height one
    // color rear element pink since its greater than pivot element
    ele[r].style.background = 'pink';
    // color the ith element(the pivot) with green because it has been positioned correctly
    ele[i].style.background = 'green';

    // pause
    await waitforme(delay);

    // color
    for (let k = 0; k < ele.length; k++) {
        if (ele[k].style.background != 'green')
            ele[k].style.background = 'cyan';
    }

    return i;
}

async function quickSort(ele, l, r) {
    if (l < r) {
        let pivot_index = await partitionLomuto(ele, l, r);
        await quickSort(ele, l, pivot_index - 1);
        await quickSort(ele, pivot_index + 1, r);
    }
    // Everytime in the first if condition, the l and r are not colored because the condition is false even when l=r, that is why we have to create an else block to color them
    else {
        if (l >= 0 && r >= 0 && l < ele.length && r < ele.length) {
            ele[r].style.background = 'green';
            ele[l].style.background = 'green';
        }
    }
}


const quickSortbtn = document.querySelector(".quickSort");
quickSortbtn.addEventListener('click', async function () {
    let ele = document.querySelectorAll('.bar');
    let l = 0;
    let r = ele.length - 1;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await quickSort(ele, l, r);
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});