import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import User from '../components/user';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import InputBase from '@mui/material/InputBase';
import { BaseUrl } from '../../util/axiosApi';   
import axios from 'axios';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { Box, 
         Tab, 
         Tabs,
         IconButton, 
         Paper, 
         Stack,
         styled, 
         Table, 
         TableBody, 
         TableCell, 
         tableCellClasses, 
         TableContainer, 
         TableHead, 
         TableRow,
         Button,
         CircularProgress,
         Typography,
         Popover,
         alpha} from '@mui/material';

         
const StyledTableCell = styled(TableCell)(({ theme }) => ({
 [`&.${tableCellClasses.head}`]: {
   backgroundColor: theme.palette.common.black,
   color: theme.palette.common.white,
   },
   [`&.${tableCellClasses.body}`]: {
     fontSize: 14,
   },
   }));
         
 const StyledTableRow = styled(TableRow)(({ theme }) => ({
   '&:nth-of-type(odd)': {
     backgroundColor: theme.palette.action.hover,
   },
   // hide last border
      '&:last-child td, &:last-child th': {
     border: 0,
         },
           }));   
     
         
const Company_Basic_List: React.FC = () => {

  const Search = styled('div')(({ theme }) => ({
     position: 'relative',
     borderRadius: theme.shape.borderRadius,
     backgroundColor: alpha(theme.palette.common.white, 0.15),
     '&:hover': {
     backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
   },
  }));
       
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
       
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
      color: 'inherit',
      '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
      width: '20ch',
       },
     },
   },
  }));     

  const { state } = useLocation();
  const [value, setValue] = React.useState(state);  
  
  const navigate = useNavigate();

  const goUser_list = () => {
        navigate('/user_list')
    };
  const goCompany_basic_list = (state: number) => {
        navigate('/company_basic_list',  { state: state })
  };

  const goWrite = () => {
    navigate('/write')
  }

  function a11yProps(index: number) {
      return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
      };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
};

const getCompanyList = async ()=>{
  const url = BaseUrl + "/company/readall"
  const { data } = await axios.post(url, {
      headers: 
      {
          "Content-Type": "application/json"
      },
      body: { uno: 0 }
  })
  return data
}

const { isLoading, data, error } = useQuery('getCompanyList', getCompanyList);

if(isLoading){
  return <CircularProgress />
}
else{
  return (
    <div className='company_basic_list'>
      <Stack direction={'row'} spacing={2} className='mypagecontents'>
         <User />    
      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224, marginTop: 10}}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
         <Tab label="회원 목록" value={0}  {...a11yProps(0)} onClick={() => { goUser_list(); }} />
         <Tab label="기업 목록" value={1}  {...a11yProps(1)} onClick={() => { goCompany_basic_list(1); }} />
      </Tabs>
      </Box>
      <Box sx={{ width: '100%' }} >
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h5" marginTop={3} marginLeft={3} gutterBottom>
                기업 목록
              </Typography>
              <Button variant="contained" startIcon={<AddOutlinedIcon/>} onClick={() => { goWrite(); }}> 
            글쓰기
          </Button>
        </Stack>
        <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden', elevation:3 }} >
        <Stack direction="row">
          <Box className='company_list'>
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Company…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          </Box>
        </Stack>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>기업명</StyledTableCell>
            <StyledTableCell>위치</StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell>키워드</StyledTableCell>
            <StyledTableCell> </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {Object.keys(data).map((value:any, index:any) => (
            <StyledTableRow hover role="checkbox" key={data[value]['cname']}>
              <StyledTableCell component="th" scope="row">{data[value]['cname']}</StyledTableCell>
              <StyledTableCell>{data[value]['address']}</StyledTableCell>
              <StyledTableCell>{ data[value]['keyword'].split(',')[0]}</StyledTableCell>
              <StyledTableCell> { data[value]['keyword'].split(',')[1]} </StyledTableCell>
              <StyledTableCell>{ data[value]['keyword'].split(',')[2]} </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Paper>
      </Box>
      </Stack>  
    </div>
  );
 }
}

export default Company_Basic_List;