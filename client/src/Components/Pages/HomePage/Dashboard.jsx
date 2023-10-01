import { Card, CardHeader, Typography, Button, CardBody, Chip, CardFooter, IconButton, Input} from "@material-tailwind/react";
import { useEffect,useState } from "react";

const TABLE_HEAD = ["Issue Name", "Description", "Service", "Status", "Start Time","End Time"];
 
function TransactionsTable() {

  const [eventData, setEventData] = useState([])
  const [query, setQuery] = useState([])
  
  // const notify = () => {
  //     Notification.requestPermission().then(perm => {
  //       if (perm === "granted") {
  //         if (true) {
  //           new Notification(` Service down! `)
  //         }
  //       }
  //     })
  //   console.log('checking')
  //   console.log(eventData.map.data)

  // }


  useEffect(() => {
    const url = (query !== '' ?
    `http://localhost:1337/api/incidents/search/${query}` :
    "http://localhost:1337/api/incidents")
          fetch(url, {
            method:"GET",
          })
          .then((res) => res.json())
            .then((data) => {
              setEventData(data.data);
          })
      },[query])


  useEffect(() => {
    fetch("http://localhost:1337/api/incidents", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "incidentData")
        setEventData(data.data)
      })
  },[])

  return (
    <div className="mx-5">
    <Card className="h-full w-full m-5 p-10 rounded-md">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              General Service Events
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about the last events
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                  placeholder="Search"
                  onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button className="flex items-center gap-3" size="sm">
               Search
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-fixed text-left">
          <thead>
            <tr key="key">
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {eventData.map( 
              (
                {
                  id,
                  title,
                  description,
                  service,
                  startTime,
                  endTime,
                  status,
                },
                index,
              ) => {
                const isLast = index === Object.keys(eventData).length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {title}
                        </Typography>
                      </div>
                    </td> 
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {description}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {service}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={status}
                          backgroundColor={
                            status === "resolved"
                              ? "green"
                              : status === "investigating"
                              ? "amber"
                              : "red"
                          }
                          className={status === "resolved" ? "bg-green-300" :
                            status === "investigating" ? "bg-amber-400" : "bg-red-400"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal capitalize"
                          >
                            {startTime}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal capitalize"
                          >
                            {endTime}
                          </Typography>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Button variant="outlined" size="sm">
          Previous
        </Button>
        <div className="flex items-center  gap-2">
          <IconButton variant="outlined" size="sm" >
            1
          </IconButton>
          <IconButton variant="text" size="sm">
            2
          </IconButton>
          <IconButton variant="text" size="sm">
            3
          </IconButton>
          <IconButton variant="text" size="sm">
            4
          </IconButton>
          <IconButton variant="text" size="sm">
            5
          </IconButton>
        </div>
        <Button variant="outlined" size="sm">
          Next
        </Button>
      </CardFooter>
    </Card>
    </div>

  );
}
  

function Dashboard() {
    return (
        <div>
            <TransactionsTable />
        </div>
    )
}

export default Dashboard;