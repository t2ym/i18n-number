# Changelog

## [4.0.1] 2020-3-27
### Added

### Changed
- Update package-lock.json
- Update test environments for Travis CI

### Removed
- Support for rare locales like zh-yue-Hans-CN, zh-CHS
- test: Remove Travis CI tests on SauceLabs to avoid connection refused errors
  - Tests pass from local to SauceLabs

## [4.0.0] 2019-3-20
### Added
- Depending on `lit-html@^1.0.0`
- Depending on `wc-putty@^0.1.0`

### Changed
- Rendering with `lit-html@^1.0.0` instead of Polymer library

### Removed
- Dependency on `@polymer/polymer`
- Safari 9 support

## [3.0.0] 2019-2-24
### Added
- Support Polymer 3.x in ES modules

### Changed

### Removed
- Polymer 1.x/2.x hybrid support in HTML Imports
- Bower support

## [2.0.0]
### Added
- Hybrid support of Polymer 1.x/2.x in the legacy syntax

### Changed

## [1.0.1]
### Added
- Polymer 1.x support

### Changed

### Removed
