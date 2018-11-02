import { StyleSheet} from 'react-native';
// import { Fonts } from '../../src/Fonts.js';

const DashStyle = StyleSheet.create({
            rootView: {
                flex:1,
                // backgroundColor:"#3370d6"
            },
            cityText:{
                // fontFamily: 'OpenSans',
                color: "#ffffff",
                fontSize: 15,
                alignSelf: 'center',
                marginTop: 10
            },
            secondScreenLevel:{
                flex:5,
                // backgroundColor:"#3B3B5C",
                paddingLeft: 12,
                paddingRight: 12
            },

            red : {
              // backgroundColor: '#EE2C38'
              flex:1,
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'center',              // backgroundColor: "#acbb37",
              height: 100,
              width: 250
            },
            container: {
              // marginTop: 48,
              flex: 1
            },
            headerStyle: {
              fontSize: 24,
              textAlign: 'center',
              fontWeight: '300',
              // marginBottom: 24
            },
            elementsContainer: {
              flex: 1,
              // backgroundColor: '#ecf5fd',
              // marginLeft: 24,
              // marginRight: 24,
              // marginBottom: 24
            }
});
export default DashStyle;
