#!/bin/bash

# This script needs appropriate permissions to be executable. 
# Set them with: chmod +x ./deploy.sh

echo "Synchronizing files that have changed"
rclone copy \
	--progress \
	--ftp-concurrency 4 \
	--checkers 2 \
	--transfers 2 \
	--exclude-from=".rclone-exclude" \
	dist \
	llll:public_html/llll.ro/tools/vizor/

# Note: the `llll` FTP host is defined with the `rclone config` command.
