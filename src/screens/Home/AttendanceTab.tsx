import React from 'react'
import { ScrollView,  ActivityIndicator } from "react-native";
import color from '../../utility/Color';
// import { Box, Center, Text, PBox } from 'rn-faiez-components';
import Box  from '../../components/Box';
import  Center  from '../../components/Center';
import  Text  from '../../components/Text';
import PBox from '../../components/PBox';
// import { Picker } from '@react-native-picker/picker'
// import {
//   LineChart,
//   BarChart,
//   PieChart,
//   ProgressChart,
//   ContributionGraph,
//   StackedBarChart
// } from "react-native-chart-kit";
import { Feather } from '@expo/vector-icons';
// import chartConfig from '../../utils/chartConfig';
import { getAttendance, getAttendanceByDate, getMonthlyAttendance } from '../../utility/db';
import log from '../../utility/log';

export default function AttendanceTab() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const d = new Date();
  const [attend, setAttend] = React.useState([]);
  const [attendDate, setAttendDate] = React.useState([]);
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
        let present=0
        let absent=0
        let leave=0

        res.attendance.map((item : any) => {
          // console.log(item)
          if(item.status=="present"){
            present++
          }
          else if(item.status=="absent"){
            absent++
          }else{
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
          {/* <PieChart
            data={data}
            width={300}
            height={200}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          /> */}
        </Box>
        {/* <Box p={12} flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"} flexWrap={"wrap"} bg={color.blue} m={5} rounded={15}>
          <Box bg={color.white} w={"40%"} alignItems={"center"} justifyContent={"center"} p={15} rounded={10} >
            <Text fontWeight={400} color={color.blue} fontSize={18}>Total Classes</Text>
            <Text fontWeight={300} color={color.blue} fontSize={16}>16</Text>
          </Box>
          <Box bg={color.white} w={"55%"} alignItems={"center"} justifyContent={"center"} p={15} rounded={10}>
            <Text fontWeight={400} color={color.blue} fontSize={18} mb={10}>Your Attendance</Text>
            <Box alignItems={"flex-start"} justifyContent={"center"}>
              <Text fontWeight={300} color={color.blue} fontSize={16}>Present: 12</Text>
              <Text fontWeight={300} color={color.blue} fontSize={16}>Absent: 3</Text>
              <Text fontWeight={300} color={color.blue} fontSize={16}>Leave: 1</Text>
            </Box>

          </Box>
        </Box> */}
        <Box p={6} ml={8}>
          <Text fontSize={22} fontWeight={"bold"} ml={8} mb={10} color={color.blue}>
            Today's Attendance
          </Text>


        </Box>
      </ScrollView>
    </Box>

  )
}