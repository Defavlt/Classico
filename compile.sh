#!/bin/bash

# Params:
# 1. Pid of the process to remember
# 2. Temp directory
function record_process {
    pid=$1
    tmpd=$2
    file=`mktemp -p $tmpd -t $pid.XXXXXX`

    echo $pid > $file
}

# Optional params:
# 1. Source directory
# 2. Jekyll output directory
function start {
    cwd="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

    tmpd="$cwd/.tmp"
    input=${1:-"$cwd/src"}
    output=${2:-"$cwd/.site"}

    css_i="$input/_scss"
    css_o="$input/css"

    scss --watch $css_i:$css_o & &>/dev/null
    record_process $! $tmpd

    jekyll serve & &>/dev/null
    record_process $! $tmpd 

}

function stop {

    cwd="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
    tmpd="$cwd/.tmp"

    shopt -s nullglob
    echo "Kill and remove pids and pidfiles.."
    printf "Pid\tPidfile"

    for pidf in $tmpd/*; 
    do
        if [ -e $pidf ];
        then
           got_files=true
           content=`cat $pidf`
           printf "\n$content\t$pidf"
           kill -9 $content > /dev/null 2>&1
           rm $pidf
        fi
    done

    if [ $got_files ];
    then
        printf "\nDone!\n"
    else
        printf "\rNo previous process alive!                                                                   \n"
    fi
}

# Optional params:
# 1: Source directory
function watch {

    cwd="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
    input=${1:-"$cwd/src"}

    css_i="$input/_scss"
    css_o="$input/css"

    while true;
    do
        change=$(inotifywait --recursive $css_i -qq -e create -e modify) # Quiet x2 for near-complete silence (-qq)
        
        &>/dev/null stop
        &>/dev/null start
    done
}

&> /dev/null watch
