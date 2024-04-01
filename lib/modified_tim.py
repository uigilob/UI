import os
from datetime import datetime
import time

def get_latest_modification_time(directory):
    latest_modified_time = 0
    latest_modified_file = None
    try:
        # Iterate through all files and directories in the directory
        for root, dirs, files in os.walk(directory):
            for filename in files:
                filepath = os.path.join(root, filename)
                # Get the last modified time of the file
                modified_time = os.path.getmtime(filepath)
                # Update the latest modified time if this file's time is greater
                if modified_time > latest_modified_time:
                    latest_modified_time = modified_time 
                    latest_modified_file = filepath
        if latest_modified_file is not None:
            # Convert latest modified time to UTC
            utc_time = datetime.utcfromtimestamp(latest_modified_time)
            # Format UTC time as desired
            formatted_time = utc_time.strftime('%a, %d %b %Y %H:%M:%S GMT')
            return formatted_time
        else:  
            return  False
    except OSError:
        return  False
