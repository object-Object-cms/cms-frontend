import type { InGridComponent } from "./RootGrid.svelte";

/**
 * Comparasion function for sorting the components left-to-right, top-to-bottom.
 */
function sortComponents(a: InGridComponent, b: InGridComponent) {
    return a.layout.y - b.layout.y || a.layout.x - b.layout.x;
}

function reflowRow(
    row: InGridComponent[],
    rowWidth: number,
    targetColumns: number
) {
    const unitSize = targetColumns / rowWidth;
    let currentWidth = 0;
    let maxHeight = 0;
    for (const component of row) {
        const newWidth = component.layout.w * unitSize;
        let newHeight = component.layout.h;
        if (component.layout.reflowHint === "keep_aspect") {
            const widthRatio = newWidth / component.layout.w;
            newHeight = Math.ceil(component.layout.h * widthRatio);
        } else if (component.layout.reflowHint === "keep_area") {
            const area = component.layout.h * component.layout.w;
            newHeight = area / newWidth;
        }
        component.layout.x = currentWidth;
        component.layout.h = newHeight;
        component.layout.w = Math.floor(newWidth);
        currentWidth += Math.ceil(newWidth);
        maxHeight = Math.max(maxHeight, newHeight);
    }
    return maxHeight;
}

export function reflowContent(
    content: InGridComponent[],
    sourceColumns: number,
    targetColumns: number
) {
    console.log(
        "Reflowing content from",
        sourceColumns,
        "to",
        targetColumns,
        "columns"
    );

    const sortedContent = content.slice().sort(sortComponents);
    const reflowedContent = [];
    console.log("sortedContent:", sortedContent);

    let y = 0;

    for (let i = 0; i < sortedContent.length; i++) {
        const component = sortedContent[i];

        const row = [];
        let currentRowWidth = 0;

        const newWidth = Math.min(component.layout.w, targetColumns);
        let newHeight = component.layout.h;
        if (component.layout.reflowHint === "keep_aspect") {
            const widthRatio = newWidth / component.layout.w;
            newHeight = Math.ceil(component.layout.h * widthRatio);
        } else if (component.layout.reflowHint === "keep_area") {
            const area = component.layout.h * component.layout.w;
            newHeight = area / newWidth;
        }
        row.push({
            id: component.id,
            component: component.component,
            layout: {
                x: currentRowWidth,
                y,
                w: newWidth,
                h: newHeight,
                reflowHint: component.layout.reflowHint
            }
        });
        currentRowWidth += newWidth;

        // append more components to this row if
        // - they wont overflow
        // - they aren't from the next row in the original layout
        while (
            sortedContent[i + 1] != null &&
            currentRowWidth + sortedContent[i + 1].layout.w <= targetColumns &&
            sortedContent[i + 1].layout.y === component.layout.y
        ) {
            const nextComponent = sortedContent[i + 1];
            row.push({
                id: nextComponent.id,
                component: nextComponent.component,
                layout: {
                    x: currentRowWidth,
                    y,
                    w: nextComponent.layout.w,
                    h: nextComponent.layout.h
                }
            });
            currentRowWidth += nextComponent.layout.w;
            i++;
        }

        y += reflowRow(row, currentRowWidth, targetColumns);

        console.log("created row:", row);
        reflowedContent.push(...row);
    }

    return reflowedContent;
}
