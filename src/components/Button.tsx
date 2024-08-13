import * as React from "react"
import { TouchableOpacity } from "react-native"
import Text from "./Text"
export default ({
    children,
    color,
    fontSize,
    btnOutline,
    btnOutlineColor,
    rounded,
    onPress,
    onLongPress,
    txtStyle,
    style
}: {
    children: React.ReactNode
    color?: string
    fontSize?: number
    btnOutline?: boolean
    btnOutlineColor?: string
    rounded?: number
    onPress?: () => void
    onLongPress?: () => void
    txtStyle?: object
    style?: object
}) => {
    const btnStyleOutline = btnOutline ? {
        borderWidth: 1,
        borderColor: btnOutlineColor ? btnOutlineColor : "#000",
        borderRadius: rounded
    } : {}
    return <TouchableOpacity style={{
        ...btnStyleOutline,
        ...style
    }}
        onPress={onPress}
        onLongPress={onLongPress}
    >
        <Text color={color} fontSize={fontSize} style={txtStyle} >{children}</Text>
    </TouchableOpacity>
}