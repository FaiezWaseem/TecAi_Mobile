import * as React from "react"
import Box from "./Box"
import Text from "./Text"
import { ActivityIndicator } from "react-native"

export default ({ isVisible, message, showMessage, subWidth, backLayer = "rgba(0,0,0,0.5)" }: {
    isVisible: boolean
    message?: string
    showMessage?: boolean
    subWidth?: number | string
    backLayer?: string
}) => {
    if (isVisible) {
        return <Box
            justifyContent={"center"}
            alignItems="center"
            position={"absolute"}
            w={"100%"}
            h={"100%"}
            zIndex={999}
            bg={backLayer}
        >
            <Box w={subWidth} p={8} rounded={8} bg={"#121212"} flexDirection="row">
                <ActivityIndicator size="large" color="white" />
                {showMessage && <Text color="white" fontSize={16} mt={10} >{message ? message : "Loading..."}</Text>}
            </Box>
        </Box>
    } else {
        return <Box></Box>
    }
}