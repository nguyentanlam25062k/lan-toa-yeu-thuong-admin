import PropTypes from 'prop-types';
import { useState } from 'react';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, Checkbox, TableCell, Typography, MenuItem, Switch } from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
// import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import { RHFSwitch } from 'src/components/hook-form';

// ----------------------------------------------------------------------

CourseTableRow.propTypes = {
  row: PropTypes.object,
  // selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  // onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function CourseTableRow({ row, onEditRow, onDeleteRow }) {
  const theme = useTheme();

  const {
    name,
    imageUrl,
    courseCategory,
    createdAt,
    publish,
    // createUid: { firstName, lastName },
  } = row;
  const firstName = '',
    lastName = '';
  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover>
      {/* <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell> */}
      <TableCell>
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
      </TableCell>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Image
          disabledEffect
          alt={imageUrl ? name : null}
          src={imageUrl}
          sx={{ borderRadius: 1.5, width: 64, height: 64, mr: 2 }}
        />
      </TableCell>

      <TableCell>{name}</TableCell>

      <TableCell>{fDate(createdAt)}</TableCell>

      <TableCell align="center">
        {/* <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (inventoryType === 'out_of_stock' && 'error') || (inventoryType === 'low_stock' && 'warning') || 'success'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {inventoryType ? sentenceCase(inventoryType) : ''}
        </Label> */}
        {/* <RHFSwitch name="inStock" label="In stock" /> */}
        <Switch checked={publish} />
      </TableCell>

      <TableCell align="right">{`${firstName} ${lastName}`}</TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
