#!/bin/bash

# 检查参数数量
if [ "$#" -ne 3 ]; then
    echo "Usage: $0 input_folder output_folder mode(s2t/t2s/s2tw/tw2s/s2hk/hk2s/s2twp/tw2sp)"
    exit 1
fi

# 参数
input_folder=$1
output_folder=$2
mode=$3

# 检查 mode 是否正确
if [[ "$mode" != "s2t" && "$mode" != "t2s" && "$mode" != "s2tw" && "$mode" != "tw2s" && \
      "$mode" != "s2hk" && "$mode" != "hk2s" && "$mode" != "s2twp" && "$mode" != "tw2sp" ]]; then
    echo "Invalid mode: $mode. Use one of the following: s2t, t2s, s2tw, tw2s, s2hk, hk2s, s2twp, tw2sp."
    exit 1
fi

# 确保输入文件夹存在
if [ ! -d "$input_folder" ]; then
    echo "Input folder does not exist: $input_folder"
    exit 1
fi

# 创建输出文件夹（如果不存在）
mkdir -p "$output_folder"

# 遍历 input_folder 下的所有文件并转换
for file in "$input_folder"/*; do
    # 确保只转换文件
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        output_file="$output_folder/$filename"

        # 调用 opencc 进行转换
        opencc -i "$file" -o "$output_file" -c "$mode".json
        echo "Converted $file -> $output_file"
    fi
done

echo "Conversion completed."