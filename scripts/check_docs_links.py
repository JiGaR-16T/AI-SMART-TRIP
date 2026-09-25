#!/usr/bin/env python3
"""
check_docs_links.py -- Verify that all relative markdown links in docs/ are valid.

Usage:
    python scripts/check_docs_links.py

Returns exit code 0 if all links are valid, 1 if any are broken.
"""

import os
import re
import sys
from pathlib import Path

# Force UTF-8 output on Windows
if sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")  # type: ignore[attr-defined]


def find_markdown_files(root_dir: str) -> list[Path]:
    """Find all .md files recursively under root_dir."""
    root = Path(root_dir)
    return sorted(root.rglob("*.md"))


def extract_relative_links(filepath: Path) -> list[tuple[int, str, str]]:
    """
    Extract relative markdown links from a file.

    Returns a list of (line_number, link_text, link_target) tuples.
    Skips URLs (http/https), anchors (#), and mailto links.
    """
    links: list[tuple[int, str, str]] = []
    # Matches [text](target) but not ![image](target)
    link_pattern = re.compile(r"(?<!!)\[([^\]]*)\]\(([^)]+)\)")

    try:
        content = filepath.read_text(encoding="utf-8")
    except (UnicodeDecodeError, OSError) as e:
        print(f"  WARNING: Could not read {filepath}: {e}")
        return links

    for line_num, line in enumerate(content.splitlines(), start=1):
        for match in link_pattern.finditer(line):
            link_text = match.group(1)
            link_target = match.group(2)

            # Skip external URLs, anchors, and mailto
            if link_target.startswith(("http://", "https://", "#", "mailto:")):
                continue

            # Strip anchor from target (e.g., "file.md#section" -> "file.md")
            target_path = link_target.split("#")[0]
            if target_path:  # Skip pure anchors
                links.append((line_num, link_text, target_path))

    return links


def check_link(source_file: Path, target: str, project_root: Path) -> bool:
    """
    Check if a relative link target exists.

    The target is resolved relative to the source file's directory.
    """
    source_dir = source_file.parent

    # Handle both forward and back slashes (Windows compatibility)
    target = target.replace("\\", "/")

    # Resolve the target relative to the source file's directory
    resolved = (source_dir / target).resolve()

    # Also check relative to project root (some links use root-relative paths)
    resolved_from_root = (project_root / target).resolve()

    return resolved.exists() or resolved_from_root.exists()


def main() -> int:
    """Main entry point. Returns 0 on success, 1 on failure."""
    # Determine project root (parent of scripts/)
    script_dir = Path(__file__).resolve().parent
    project_root = script_dir.parent

    print(f"Project root: {project_root}")
    print(f"Scanning for markdown files...\n")

    # Find all markdown files in the project (excluding node_modules, .venv, etc.)
    exclude_dirs = {
        "node_modules", ".venv", "venv", "__pycache__",
        ".git", ".mypy_cache", ".pytest_cache", ".ruff_cache",
    }

    all_md_files: list[Path] = []
    for md_file in project_root.rglob("*.md"):
        # Skip excluded directories
        parts = md_file.relative_to(project_root).parts
        if any(part in exclude_dirs for part in parts):
            continue
        all_md_files.append(md_file)

    all_md_files.sort()

    total_links = 0
    broken_links: list[tuple[Path, int, str, str]] = []
    valid_links = 0

    for md_file in all_md_files:
        relative_path = md_file.relative_to(project_root)
        links = extract_relative_links(md_file)

        if not links:
            continue

        print(f"Checking {relative_path} ({len(links)} links)...")

        for line_num, link_text, link_target in links:
            total_links += 1
            if check_link(md_file, link_target, project_root):
                valid_links += 1
            else:
                broken_links.append((md_file, line_num, link_text, link_target))
                print(f"  [BROKEN] Line {line_num}: [{link_text}]({link_target}) -- TARGET NOT FOUND")

    # Summary
    print(f"\n{'='*60}")
    print(f"RESULTS: {len(all_md_files)} files scanned, {total_links} links checked")
    print(f"  [OK]     Valid:  {valid_links}")
    print(f"  [BROKEN] Broken: {len(broken_links)}")
    print(f"{'='*60}")

    if broken_links:
        print("\nBROKEN LINKS:")
        for filepath, line_num, text, target in broken_links:
            rel = filepath.relative_to(project_root)
            print(f"  {rel}:{line_num} -- [{text}]({target})")
        return 1

    print("\n[OK] All links are valid!")
    return 0


if __name__ == "__main__":
    sys.exit(main())
