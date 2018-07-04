The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

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