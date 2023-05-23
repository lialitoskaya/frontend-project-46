### Hexlet tests and linter status:

[![Actions Status](https://github.com/lialitoskaya/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/lialitoskaya/frontend-project-46/actions)
<a href="https://codeclimate.com/github/lialitoskaya/frontend-project-46/maintainability"><img src="https://api.codeclimate.com/v1/badges/19090aa68e4a45f0d3b0/maintainability" /></a>
<a href="https://codeclimate.com/github/lialitoskaya/frontend-project-46/test_coverage"><img src="https://api.codeclimate.com/v1/badges/19090aa68e4a45f0d3b0/test_coverage" /></a>

program to find difference between two files with different extensions ('.json', '.yaml')
works with absolute and relative paths to files
takes two required arguments (the path to the first file to compare against and the path to the second file) and one optional formatter argument (-f options), default 'stylish'

call example: gendiff -f json ../**fixtures**/newfile3.yaml ../**fixtures**/newfile1.json

video with an example of using gendiff:

reference Information
https://asciinema.org/a/NFSKacK3DkLygCqFwqSTG9vXI

usage example with default formatter
https://asciinema.org/a/Hcv7o0EhZ7K5nvYFMfmnAyHL1

usage example with 'plain' formatter
https://asciinema.org/a/aiKQVCCLqvPuWJInAUTOmxehp

usage example with 'json' formatter
https://asciinema.org/a/CjEm34HkSmUZTUI6QffRxCX6g
