import { expect, test } from 'vitest';
import { get, writable } from 'svelte/store';
import { selection } from '$lib/logic/selection';
import {
    ListFileItem,
    ListWaypointItem,
} from '$lib/components/file-list/file-list';

test('selectFile selects a file', () => {
    selection.selectFile('file-1');

    const expected = new ListFileItem('file-1');
    expect(get(selection).has(expected)).toBe(true);
});

test('selectFile, when there is an existing selected file, replaces the file selection', () => {
    selection.selectFile('previous-file');
    selection.selectFile('file-1');

    const previous = new ListFileItem('previous-file');
    expect(get(selection).has(previous)).toBe(false);

    const expected = new ListFileItem('file-1');
    expect(get(selection).has(expected)).toBe(true);
});

test('selectItem, with a ListWaypointItem, selects that item', () => {
    const item = new ListWaypointItem('file-1', 42);
    selection.selectItem(item);

    expect(get(selection).has(item)).toBe(true);
});

test.fails('selectItem, with a ListWaypointItem, when there is an existing selected file, maintains the file selection', () => {
    selection.selectFile('file-1');

    const item = new ListWaypointItem('file-1', 42);
    selection.selectItem(item);

    const expected = new ListFileItem('file-1');
    expect(get(selection).has(expected)).toBe(true);
});
