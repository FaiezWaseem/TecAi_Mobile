import React from 'react'
import { ScrollView, ActivityIndicator } from "react-native";
import color from '../../utility/Color';
import Box from '../../components/Box';
import Center from '../../components/Center';
import Text from '../../components/Text';
import PBox from '../../components/PBox';
import { Picker } from '@react-native-picker/picker'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import { getAttendance, getAttendanceByDate, getMonthlyAttendance } from '../../utility/db';
import log from '../../utility/log';

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

interface Attendance {
  status : string,
  date : string
}


export default function AttendanceTab() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const d = new Date();
  const [attend, setAttend] = React.useState<Attendance | null>(null);
  const [attendDate, setAttendDate] = React.useState<Attendance | null>(null);
  const [attendDateCheck, setAttendDateCheck] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(`${d.getDate()}`);
  const [selectedMonth, setSelectedMonth] = React.useState(`01`);
  const [selectedYear, setSelectedYear] = React.useState('2024');
  const [present, setPresent] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const [absent, setAbsent] = React.useState(0);
  const [leave, setLeave] = React.useState(0);

  // const [hideall, setHideAll] = React.useState(false);
  let data = [
    {
      name: "Present",
      population: present,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Absent",
      population: absent,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Leave",
      population: leave,
      color: "black",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
  ];
  const dateData = [
    "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
  ];
  const monthData = [
    "01", "02", "03", "04", "05", "06",
    "07", "08", "09", "10", "11", "12"
  ];
  const currentYear = new Date().getFullYear();
  const yearData = [];

  for (let year = currentYear; year >= 2010; year--) {
    yearData.push(year);
  }

  const getDatedAttendance = async () => {
    setLoading(true)
    setAttendDateCheck(false)
    try {
      const attendate = `${selectedYear}-${selectedMonth}-${selectedDate}`
      log(attendate)
      getAttendanceByDate(attendate).then(res => {
        if (res.status) {
          log(res.attendance[0])
          setAttendDate(res.attendance[0])
          setAttendDateCheck(true)
          setLoading(false)

        } else {
          setAttendDateCheck(false)

        }
      })
    } catch (error) {
      setAttendDateCheck(false)
    }
  }

  React.useEffect(() => {
    getAttendance().then(res => {
      log(res.attendance[0])
      setAttend(res.attendance[0])

    })
    getMonthlyAttendance().then(res => {
      // if (res.status) {
      // setActivity(res.assignments)
      // console.log("monthlyAttendance"+res);
      console.log(res.attendance[0])
      let present = 0
      let absent = 0
      let leave = 0

      res.attendance.map((item: any) => {
        // console.log(item)
        if (item.status == "present") {
          present++
        }
        else if (item.status == "absent") {
          absent++
        } else {
          leave++
        }
      })
      setPresent(present)
      setAbsent(absent)
      setLeave(leave)



      // }
    })

  }, [])
  return (
    <Box bg={color.white} >
      <ScrollView>
        <Center mb={5} bg={color.blue}>
          <Center p={12} mb={20} w={"100%"}>
          </Center>
          <Box w={'100%'} flexDirection={'row'} alignItems={"center"} justifyContent={"center"} mb={10}>
          </Box>
        </Center>
        <Box flexDirection={"row"} alignItems={"center"} justifyContent={"center"} flexWrap={"wrap"} w={'100%'} >
          <PieChart
            data={data}
            width={300}
            height={200}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}


          />
        </Box>
        <Box p={12} flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"} flexWrap={"wrap"} bg={color.blue} m={5} rounded={15}>
          <Box bg={color.white} w={"40%"} alignItems={"center"} justifyContent={"center"} p={15} rounded={10} >
            <Text fontWeight={"400"} color={color.blue} fontSize={18}>Total Classes</Text>
            <Text fontWeight={"300"} color={color.blue} fontSize={16}>{Number(present) + Number(absent) + Number(leave)}</Text>
          </Box>
          <Box bg={color.white} w={"55%"} alignItems={"center"} justifyContent={"center"} p={15} rounded={10}>
            <Text fontWeight={"400"} color={color.blue} fontSize={18} mb={10}>Your Attendance</Text>
            <Box alignItems={"flex-start"} justifyContent={"center"}>
              <Text fontWeight={"300"} color={color.blue} fontSize={16}>Present: {present}</Text>
              <Text fontWeight={"300"} color={color.blue} fontSize={16}>Absent: {absent}</Text>
              <Text fontWeight={"300"} color={color.blue} fontSize={16}>Leave: {leave}</Text>
            </Box>

          </Box>
        </Box>
        <Box p={6} ml={8}>
          <Text fontSize={22} fontWeight={"bold"} ml={8} mb={10} color={color.blue}>
            Today's Attendance
          </Text>


          {attend ? (<>
            < Box w={"100%"} bg={color.blue} rounded={5} p={10} flexDirection={"row"} justifyContent={"space-between"} flexWrap={"wrap"}>
              <Box w={"100%"} flexDirection={"row"} justifyContent={"space-between"} flexWrap={"wrap"}>
                <Box alignItems={"center"} justifyContent={"center"} flexDirection={"row"} w={"30%"}>
                  <Text p={5} color={color.white} fontSize={18}>Day</Text>
                </Box>
                <Box alignItems={"center"} justifyContent={"center"} flexDirection={"row"} w={"30%"}>
                  <Text p={5} color={color.white} fontSize={18}>Date</Text>
                </Box>
                <Box alignItems={"center"} justifyContent={"center"} flexDirection={"row"} w={"30%"}>
                  <Text p={5} color={color.white} fontSize={18}>Status</Text>
                </Box>
              </Box>
              <Box w={"100%"} flexDirection={"row"} justifyContent={"space-between"} flexWrap={"wrap"}>
                <Box rounded={15} bg={color.white} w={"30%"} p={5} alignItems={"center"} justifyContent={"center"}>
                  <Text>{days[d.getDay()]}</Text>
                </Box>
                <Box rounded={15} bg={color.white} w={"30%"} p={5} alignItems={"center"} justifyContent={"center"}>
                  <Text>{d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear()}</Text>
                </Box>
                <Box rounded={15} bg={attend?.status == "present" ? "green" : "red"} w={"30%"} p={5} alignItems={"center"} justifyContent={"center"}>
                  <Text color={color.white}>{attend?.status}</Text>
                </Box>
              </Box>
            </Box>

          </>) : (<>
            <Box w={"100%"} bg={color.blue} rounded={5} p={10} flexDirection={"row"} justifyContent={"center"} alignItems={"center"} flexWrap={"wrap"}>

              <Text p={5} color={color.white} fontSize={18}>Attendance Status Unavailable</Text>
            </Box>

          </>)}

          <Text fontSize={22} fontWeight={"bold"} ml={8} mb={10} mt={10} color={color.blue}>
            Filtered Attendance
          </Text>
          <Box w={"100%"} flexDirection={"row"} justifyContent={"space-between"} flexWrap={"wrap"}>
            <Box rounded={15} bg={color.blue} w={"30%"} p={5} alignItems={"center"} justifyContent={"center"}>
              <Text>Select Date</Text>
            </Box>
            <Box rounded={15} bg={color.blue} w={"30%"} p={5} alignItems={"center"} justifyContent={"center"}>
              <Text>Select Month</Text>
            </Box>
            <Box rounded={15} w={"40%"} bg={color.blue} p={5} alignItems={"center"} justifyContent={"center"}>
              <Text >Select Year</Text>
            </Box>
          </Box>
          <Box rounded={15} bg={color.white} w={"100%"} p={5} alignItems={"center"} justifyContent={"center"} flexDirection={"row"}>
            <Box w={"30%"}>
              <Picker
                  style={{
                    backgroundColor : color.blue
                  }}
                selectedValue={selectedDate}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedDate(itemValue)
                }
              >
                {dateData.map((date) => (
                  <Picker.Item key={date.toString()} label={date.toString()} value={date.toString()} />
                ))}
              </Picker>
            </Box>
            <Box w={"30%"} m={1}>
              <Picker
                 style={{
                  backgroundColor : color.blue
                }}
                selectedValue={selectedMonth}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedMonth(itemValue)
                }
              >
                {monthData.map((date) => (
                  <Picker.Item key={date.toString()} label={date.toString()} value={date.toString()} />
                ))}
              </Picker>
            </Box>
            <Box w={"40%"}>
              <Picker
                selectedValue={selectedYear}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedYear(itemValue)
                }
                style={{
                  backgroundColor : color.blue
                }}
              >
                {yearData.map((date) => (
                  <Picker.Item key={date.toString()} label={date.toString()} value={date.toString()} />
                ))}
              </Picker>
            </Box>
          </Box>
         {loading? (<ActivityIndicator/>):(<>
          {attendDate ? (<>
            {attendDate?.status ? (<>
              < Box w={"100%"} bg={color.blue} rounded={5} p={10} flexDirection={"row"} justifyContent={"space-between"} flexWrap={"wrap"}>
                <Box w={"100%"} flexDirection={"row"} justifyContent={"space-between"} flexWrap={"wrap"}>
                  <Box alignItems={"center"} justifyContent={"center"} flexDirection={"row"} w={"30%"}>
                    <Text p={5} color={color.white} fontSize={18}>Day</Text>
                  </Box>
                  <Box alignItems={"center"} justifyContent={"center"} flexDirection={"row"} w={"30%"}>
                    <Text p={5} color={color.white} fontSize={18}>Date</Text>
                  </Box>
                  <Box alignItems={"center"} justifyContent={"center"} flexDirection={"row"} w={"30%"}>
                    <Text p={5} color={color.white} fontSize={18}>Status</Text>
                  </Box>
                </Box>
                <Box w={"100%"} flexDirection={"row"} justifyContent={"space-between"} flexWrap={"wrap"}>
                  <Box rounded={15} bg={color.white} w={"30%"} p={5} alignItems={"center"} justifyContent={"center"}>
                    <Text>{days[new Date(attendDate?.date.split(" ")[0]).getDay()]}</Text>
                  </Box>
                  <Box rounded={15} bg={color.white} w={"30%"} p={5} alignItems={"center"} justifyContent={"center"}>
                    <Text>{attendDate?.date.split(" ")[0].split("-").reverse().join("-")}</Text>
                  </Box>
                  <Box rounded={15} bg={attendDate?.status == "present" ? "green" : "red"} w={"30%"} p={5} alignItems={"center"} justifyContent={"center"}>
                    <Text color={color.white}>{attendDate?.status}</Text>
                  </Box>
                </Box>
              </Box>
            </>) : (<>
              <Box w={"100%"} bg={color.blue} rounded={5} p={10} flexDirection={"row"} justifyContent={"center"} alignItems={"center"} flexWrap={"wrap"}>

                <Text p={5} color={color.white} fontSize={18}>Attendance Status Unavailable</Text>
              </Box>
            </>)}

          </>) : (<>
            <Box w={"100%"} bg={color.blue} rounded={5} p={10} flexDirection={"row"} justifyContent={"center"} alignItems={"center"} flexWrap={"wrap"}>

              <Text p={5} color={color.white} fontSize={18}>No Record Available</Text>
            </Box>
          </>)}
         </>)} 
  
          <Box w={"100%"} flexDirection={"row"} justifyContent={"center"} flexWrap={"wrap"} alignItems={"center"}>

            <PBox p={7} e={2} m={8} bg={color.blue} rounded={3} w={"80%"} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} onPress={() => { getDatedAttendance() }}>
              <Text color={color.white}>Filter</Text>
            </PBox>
          </Box>
        </Box>
      </ScrollView>
    </Box>

  )
}