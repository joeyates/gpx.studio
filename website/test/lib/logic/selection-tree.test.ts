import { expect, test } from 'vitest';
import { SelectionTreeType } from '$lib/logic/selection-tree';
import { ListRootItem, ListFileItem, ListTrackItem, ListWaypointItem } from '$lib/components/file-list/file-list';

test('a newly constructed tree is not selected', () => {
    const tree = new SelectionTreeType(new ListRootItem());

    expect(tree.selected).toBe(false);
});

test('a newly constructed tree has size 0', () => {
    const tree = new SelectionTreeType(new ListFileItem('file-1'));

    expect(tree.size).toBe(0);
});

test('a newly constructed tree has no children', () => {
    const tree = new SelectionTreeType(new ListRootItem());

    expect(Object.keys(tree.children).length).toBe(0);
});

test('setting selection on the root item selects the tree', () => {
    const file1 = new ListFileItem('file-1');
    const tree = new SelectionTreeType(file1);

    tree.set(file1, true);

    expect(tree.selected).toBe(true);
});

test('setting the selection on the root item updates size to 1', () => {
    const root = new ListRootItem();
    const tree = new SelectionTreeType(root);

    tree.set(root, true);

    expect(tree.size).toBe(1);
});

test('un-setting the selection on the root item deselects the tree', () => {
    const file1 = new ListFileItem('file-1');
    const tree = new SelectionTreeType(file1);

    tree.set(file1, true);
    tree.set(file1, false);

    expect(tree.selected).toBe(false);
});

test('un-setting the selection on the root item updates size to 0', () => {
    const root = new ListRootItem();
    const tree = new SelectionTreeType(root);

    tree.set(root, true);
    tree.set(root, false);

    expect(tree.size).toBe(0);
});

test('setting the selection on a child item does not select the tree', () => {
    const file1 = new ListFileItem('file-1');
    const tree = new SelectionTreeType(file1);
    const track1 = new ListTrackItem('file-1', 'track-1');

    tree.set(track1, true);

    expect(tree.selected).toBe(false);
});

test('setting the selection on a grandchild item does not select the tree', () => {
    const root = new ListRootItem();
    const tree = new SelectionTreeType(root);
    const track1 = new ListTrackItem('file-1', 'track-1');

    tree.set(track1, true);

    expect(tree.selected).toBe(false);
});

test('setting the selection on a grandchild item updates size to 1', () => {
    const file1 = new ListFileItem('file-1');
    const tree = new SelectionTreeType(file1);
    const waypoint = new ListWaypointItem('file-1', 42);

    tree.set(waypoint, true);

    expect(tree.size).toBe(1);
});

test('setting the selection on a child item updates size to 1', () => {
    const root = new ListRootItem();
    const tree = new SelectionTreeType(root);
    const file1 = new ListFileItem('file-1');

    tree.set(file1, true);

    expect(tree.size).toBe(1);
});

test('clearing the tree deselects it', () => {
    const file1 = new ListFileItem('file-1');
    const tree = new SelectionTreeType(file1);
    tree.set(file1, true);

    tree.clear();

    expect(tree.selected).toBe(false);
});

test('clearing the tree updates size to 0', () => {
    const root = new ListRootItem();
    const tree = new SelectionTreeType(root);
    tree.set(root, true);

    tree.clear();

    expect(tree.size).toBe(0);
});

test('toggling selection on the root item, when deselected, selects the tree', () => {
    const file1 = new ListFileItem('file-1');
    const tree = new SelectionTreeType(file1);

    tree.toggle(file1);

    expect(tree.selected).toBe(true);
});

test('toggling selection on the root item, when deselected, updates size to 1', () => {
    const file1 = new ListFileItem('file-1');
    const tree = new SelectionTreeType(file1);

    tree.toggle(file1);

    expect(tree.size).toBe(1);
});

test('toggling selection on the root item, when selected, deselects the tree', () => {
    const root = new ListRootItem();
    const tree = new SelectionTreeType(root);
    tree.set(root, true);

    tree.toggle(root);

    expect(tree.selected).toBe(false);
});

test('toggling selection on the root item, when selected, updates size to 0', () => {
    const root = new ListRootItem();
    const tree = new SelectionTreeType(root);
    tree.set(root, true);

    tree.toggle(root);

    expect(tree.size).toBe(0);
});

test('checking selection on the root item, when selected, returns correct value', () => {
    const file1 = new ListFileItem('file-1');
    const tree = new SelectionTreeType(file1);
    tree.set(file1, true);

    expect(tree.has(file1)).toBe(true);
});

test('checking selection on the root item, when deselected, returns correct value', () => {
    const file1 = new ListFileItem('file-1');
    const tree = new SelectionTreeType(file1);

    expect(tree.has(file1)).toBe(false);
});

test('checking selection on a child item, when selected, returns correct value', () => {
    const root = new ListRootItem();
    const tree = new SelectionTreeType(root);
    const file1 = new ListFileItem('file-1');
    tree.set(file1, true);

    expect(tree.has(file1)).toBe(true);
});

test('checking selection on a child item, when deselected, returns correct value', () => {
    const root = new ListRootItem();
    const tree = new SelectionTreeType(root);
    const file1 = new ListFileItem('file-1');

    expect(tree.has(file1)).toBe(false);
});

test('checking selection on a grandchild item, when selected, returns correct value', () => {
    const file1 = new ListFileItem('file-1');
    const tree = new SelectionTreeType(file1);
    const waypoint = new ListWaypointItem('file-1', 42);
    tree.set(waypoint, true);

    expect(tree.has(waypoint)).toBe(true);
});

test('checking selection on a grandchild item, when deselected, returns correct value', () => {
    const file1 = new ListFileItem('file-1');
    const tree = new SelectionTreeType(file1);
    const waypoint = new ListWaypointItem('file-1', 42);

    expect(tree.has(waypoint)).toBe(false);
});

test('checking hasAnyParent on a child item, when root is selected, returns true', () => {
    const root = new ListRootItem();
    const tree = new SelectionTreeType(root);
    const file1 = new ListFileItem('file-1');

    tree.set(root, true);

    expect(tree.hasAnyParent(file1)).toBe(true);
});

test('checking hasAnyParent on a child item, when root is deselected, returns false', () => {
    const root = new ListRootItem();
    const tree = new SelectionTreeType(root);
    const file1 = new ListFileItem('file-1');

    expect(tree.hasAnyParent(file1)).toBe(false);
});

test('checking hasAnyParent on a child item, when only a sibling is selected, returns false', () => {
    const file1 = new ListFileItem('file-1');
    const tree = new SelectionTreeType(file1);
    const track1 = new ListTrackItem('file-1', 'track-1');
    const track2 = new ListTrackItem('file-1', 'track-2');
    tree.set(track1, true);

    expect(tree.hasAnyParent(track2)).toBe(false);
});

test('checking hasAnyParent on a grandchild item, when root is selected, returns true', () => {
    const root = new ListRootItem();
    const tree = new SelectionTreeType(root);
    const track1 = new ListTrackItem('file-1', 'track-1');
    tree.set(root, true);

    expect(tree.hasAnyParent(track1)).toBe(true);
});
