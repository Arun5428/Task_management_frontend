import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../api/api";

export const submitTask=createAsyncThunk("submission/submitTask",
async({taskId,githubLink})=>{
    setAuthHeader(localStorage.getItem('jwt'),api)
    try{

        const {data}=await api.post(`/api/submission?taskId=${taskId}&githumLink=${githubLink}`,{})
            
        console.log("submission task submited",data);
        return data;
        
    }catch(error){
        console.log("catch",error);
        throw Error(error.response.data.error)
        

    }
}
);



export const fetchAllSubmission=createAsyncThunk("submission/fetchAllSubmission",
    async()=>{
        setAuthHeader(localStorage.getItem('jwt'),api)
        try{
    
            const {data}=await api.get(`/api/submission`)
            console.log(" all ssubmission fetched",data);
            return data
            
        }catch(error){
            console.log("catch",error);
            throw Error(error.response.data.error)
            
    
        }
    }
    );




    export const fetchSubmissionsByTaskId=createAsyncThunk("submission/fetchSubmissionsByTaskId",
        async({taskId})=>{
            setAuthHeader(localStorage.getItem("jwt"),api)
            try{
        
                const {data}=await api.get(`/api/submission/task/${taskId}`)
                
                console.log("submission by id",data);
                return data;
                
            }catch(error){
                console.log("catch",error);
                throw Error(error.response.data.error)
                
        
            }
        }
        );



        export const acceptDeclineSubmission=createAsyncThunk("submission/acceptDeclineSubmission",
            async({id,status})=>{
                setAuthHeader(localStorage.getItem('jwt'),api)
                try{
            
                    const {data}=await api.put(`/api/submission/${id}?status=${status}`,{})
                    console.log("accept task",data);
                    return data
                    
                }catch(error){
                    console.log("catch",error);
                    throw Error(error.response.data.error)
                    
            
                }
            }
            );



const submissionSlice=createSlice({
    name:'submission',
    initialState:{
      
      submissions:[],
      status:'',
      error:null
    },
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(submitTask.pending,(status)=>{
            status.status="loading";
        })
        .addCase(submitTask.fulfilled,(state,action)=>{
            state.status="succeeded";
             state.submissions.push(action.payload);
        })
        .addCase(submitTask.rejected,(state,action)=>{
            state.status="failed";
            state.error=action.error.message;
        })

    
        .addCase(fetchAllSubmission.fulfilled,(state,action)=>{
            state.status="succeeded";
            state.submissions=action.payload;
        })
        .addCase(fetchAllSubmission.rejected,(state,action)=>{
            state.status="failed";
            state.error=action.error.message;
        })

        .addCase(fetchSubmissionsByTaskId.fulfilled,(state,action)=>{
            state.status="succeeded";
            state.submissions=action.payload;
        })

        .addCase(acceptDeclineSubmission.fulfilled,(state,action)=>{
            state.status="succeeded";
            state.submissions=state.submissions.map((item)=>item.id!==action.payload.id?item:action.payload)
        })


    },
   



});

export default submissionSlice.reducer;