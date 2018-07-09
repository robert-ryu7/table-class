The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 1.3.0 - 2018-07-09
### Added
- Added documentation generation into build process.
- Added README.md.
- Added additional package info.
- Added cw and ccw methods for rotating tables clockwise and counterclockwise respectively.
- Added flipX and flipY methods for mirroring tables horizontally and vertically respectively.

### Changed
- Fixed format of JSDoc comments.

## 1.2.0 - 2018-07-08
### Added
- Added support for browser environment.

## 1.1.2 - 2018-07-08
### Added
- Added tarball archives to .gitignore and .npmignore files to prevent accidental publication of those files to npm.

### Changed
- Used prepare hook for building the project before publishing since prepublish is deprecated.

## 1.1.1 - 2018-07-05
### Added
- Added IDE files to .npmignore file.

## 1.1.0 - 2018-07-04
### Added
- Added this CHANGELOG file.
- Added get method which returns value at given coordinates.
- Added reduce method similiar to Array.reduce.
- Added forEach method similiar to Array.forEach.
- Added fromRows and fromCols methods which allow for easy table creation from existing data.

### Changed
- Made set method chainable.

### Removed
- Removed lodash from dependencies making this module dependency-free.