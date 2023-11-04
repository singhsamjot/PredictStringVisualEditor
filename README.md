# Development

`
yarn install 
`

`
yarn dev
`

# Overview
Your objective is to make a simple visual editor. The editor will have a pallet area, a layout area,
and an action area. You may use any frameworks you wish.


# Requirements
1. The layout area is vertical list of four square cells
2. The pallet area is a list of images. Just pick a few test images from the web to use.
3. Images can be dragged and dropped onto any of the layout area cells
4. Layout area cells can be split vertically or horizontally in half to create two new layout
cells, which can also be split further. Layout cells that are split occupy the same space
as the cell that they were split from. So, if a cell is split horizontally, there will be two
new cells that occupy the same space as the cell that was split, except each new cell
is half the height, and one cell covers the top and one cell covers the bottom.
5. New layout cells can be added to the bottom of the layout area by clicking a button in the
action area.
6. Clicking and dragging one cell onto another swaps the contents of the cells.
7. The layout area can be saved and recalled by clicking a “Save” button in the action area
that presents a popup asking the user for a name for the layout.
8. The action area will have a “Save” button, a “Load” button, and a dropdown with all
previously saved layouts.
9. Selecting a previously saved layout from the drop-down and clicking “Load” will replace
the contents of the layout area with the saved layout.
Example Interface

# Notes

- All the image assets are in public folder and referred from there