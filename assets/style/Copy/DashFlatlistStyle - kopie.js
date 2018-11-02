import { StyleSheet} from 'react-native';
// import { Fonts } from '../../src/Fonts.js';

const DashFlatlistStyle = StyleSheet.create({
    dailyTitleView:{
        marginTop:4,
        marginBottom: 4
    },
    topFlatlistView:{
        height: 201,
        borderBottomWidth: 1,
        borderColor: "#C8C7CC"
    },

    viewFlatlistItemDate:{
        width: '75%', height: 50,
        borderTopWidth: 1,
        borderColor: "#C8C7CC",
        // backgroundColor: '#3B3B5C',
        // color: '#ffffff'
    },

    insideFlatlistView:{
        flexDirection: 'row',
        // paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
        flex: 1,
        // backgroundColor: "#ffffff",
    },
    fontColor:{
        // color: '#ffffff'
    },
    dateText:{
        fontSize: 16 ,
        lineHeight: 50,
        // color: '#ffffff'
    },
    imageView:{
        width: '15%',
        height: 50,
        borderTopWidth: 1,
        borderColor: "#C8C7CC"
    },

    titleText:{
        alignSelf: 'center',
        // color: '#C8C7CC',/
        color: '#6FA9CF',
        fontWeight: 'bold'
    },
    textColor:{
        color: '#ffffff'
    }
});
export default DashFlatlistStyle;
