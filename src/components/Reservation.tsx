import React, { useState, useCallback } from 'react';
import { IReservation } from '../models/IReservation';
import Container from '@material-ui/core/Container/Container';
import Paper from '@material-ui/core/Paper/Paper';
import TextField from '@material-ui/core/TextField/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Chip from '@material-ui/core/Chip/Chip';
import Avatar from '@material-ui/core/Avatar/Avatar';
import dayjs, { Dayjs } from 'dayjs';
import Grid from '@material-ui/core/Grid/Grid';
import Button from '@material-ui/core/Button/Button';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import { IFacility } from '../models/IFacility';
import { useForm, Controller } from 'react-hook-form';
import { DateTimePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

const initReservation: IReservation = {
  id: '001',
  facilityId: '001',
  subject: '目的０１',
  description: '説明００１',
  startDate: dayjs(),
  endDate: dayjs().add(1, 'hour'),
  system: {
    createDate: new Date(),
    createUser: {
      displayName: 'ebihara kenji',
      email: '',
      face: 'https://media.istockphoto.com/photos/smiling-traditional-japanese-senior-woman-picture-id970956816?k=20&m=970956816&s=612x612&w=0&h=ilQIyaSAnGYlA1NBPIhEhLi7_OCJlfGz4ThSgmm2cNE=',
    },
    lastUpdateUser: {
      displayName: 'ebihara kenji',
      email: '',
      face: 'https://media.istockphoto.com/photos/smiling-traditional-japanese-senior-woman-picture-id970956816?k=20&m=970956816&s=612x612&w=0&h=ilQIyaSAnGYlA1NBPIhEhLi7_OCJlfGz4ThSgmm2cNE=',
    },
    lastUpdate: new Date(),
  },
};

const useStyle = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(1),
  },
  rightActions: {
    textAlign: 'right',
  },
  cancelBotton: {
    color: theme.palette.error.main,
  },
}));

export const Reservation: React.FC = () => {
  const style = useStyle();
  const { system } = initReservation;

  const { register, errors, control } = useForm<IReservation>({
    defaultValues: initReservation,
    mode: 'onBlur',
  });

  return (
    <Container maxWidth="sm" className={style.root}>
      <Paper className={style.paper}>
        <Controller
          control={control}
          name="startDate"
          render={(data) => {
            return (
              <DateTimePicker
                value={data.value}
                onChange={data.onChange}
                onBlur={data.onBlur}
                label="開始日時"
                format="YYYY/MM/DD HH:mm"
                ampm={false}
                minutesStep={15}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="endDate"
          render={(data) => {
            return (
              <DateTimePicker
                value={data.value}
                onChange={data.onChange}
                onBlur={data.onBlur}
                label="終了日時"
                format="YYYY/MM/DD HH:mm"
                ampm={false}
                minutesStep={15}
              />
            );
          }}
        />
        <Controller
          control={control}
          rules={{ required: true }}
          name="subject"
          as={
            <TextField
              label="目的"
              fullWidth
              value=""
              error={!!errors.subject}
              helperText={errors.subject ? '必須です' : ''}
            />
          }
        />
        <Controller
          control={control}
          rules={{ required: true }}
          name="description"
          as={
            <TextField
              label="詳細"
              fullWidth
              multiline
              value=""
              error={!!errors.description}
              helperText={errors.description ? '必須です' : ''}
            />
          }
        />

        <InputLabel shrink>登録者</InputLabel>
        <p>
          <Chip
            label={system.createUser.displayName}
            avatar={
              <Avatar src="https://media.istockphoto.com/photos/smiling-traditional-japanese-senior-woman-picture-id970956816?k=20&m=970956816&s=612x612&w=0&h=ilQIyaSAnGYlA1NBPIhEhLi7_OCJlfGz4ThSgmm2cNE=" />
            }
          />
          {dayjs(system.createDate).format('YYYY-MM-DD HH:mm')}
        </p>
        <InputLabel shrink>更新者</InputLabel>
        <p>
          <Chip
            label={system.lastUpdateUser.displayName}
            avatar={
              <Avatar src="https://media.istockphoto.com/photos/smiling-traditional-japanese-senior-woman-picture-id970956816?k=20&m=970956816&s=612x612&w=0&h=ilQIyaSAnGYlA1NBPIhEhLi7_OCJlfGz4ThSgmm2cNE=" />
            }
          />
          {dayjs(system.lastUpdate).format('YYYY-MM-DD HH:mm')}
        </p>
        <Grid container>
          <Grid item xs={6}>
            <Button className={style.cancelBotton} startIcon={<DeleteIcon />}>
              削除
            </Button>
          </Grid>
          <Grid item xs={6} className={style.rightActions}>
            <Button color="primary" startIcon={<DoneIcon />}>
              保存
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
