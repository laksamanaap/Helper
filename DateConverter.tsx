import { format, formatDistance, formatRelative, subDays } from 'date-fns'

const convertDateString = (dateStr: any, outputFormat = 'dd-MM-yyyy') => {
    if (dateStr) {
      const date = new Date(dateStr);
      return format(date, outputFormat);
    } else {
      return "-";
    }
  }

// Other Return Object Type
format(new Date(), "'Today is a' eeee")
//=> "Today is a Wednesday"

formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true })
//=> "3 days ago"

formatRelative(subDays(new Date(), 3), new Date())
//=> "last Friday at 7:26 p.m."

// Usage Example
{convertDateString(userDetailData?.createdDate) || "-"}
