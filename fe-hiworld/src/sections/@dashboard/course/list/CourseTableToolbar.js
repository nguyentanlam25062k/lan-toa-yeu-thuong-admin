import PropTypes from 'prop-types';
// @mui
import { Tooltip, IconButton, Stack, InputAdornment, TextField, MenuItem } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

CourseTableToolbar.propTypes = {
  search: PropTypes.string,
  filterCategory: PropTypes.string,
  onSearchName: PropTypes.func,
  onFilterCategory: PropTypes.func,
  optionsCategory: PropTypes.arrayOf(PropTypes.object),
};

export default function CourseTableToolbar({
  search,
  filterCategory,
  optionsCategory,
  onSearchName,
  onFilterCategory,
}) {
  return (
    // <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 2.5, px: 3 }}>
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5, px: 3 }}>
      <TextField
        fullWidth
        select
        label="Category"
        value={filterCategory}
        onChange={onFilterCategory}
        SelectProps={{
          MenuProps: {
            sx: { '& .MuiPaper-root': { maxHeight: 260 } },
          },
        }}
        sx={{
          maxWidth: { sm: 240 },
          textTransform: 'capitalize',
        }}
      >
        {optionsCategory.map((option) => (
          <MenuItem
            key={option._id}
            value={option._id}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {option.name}
          </MenuItem>
        ))}
      </TextField> 

      <TextField
        fullWidth
        value={search}
        onChange={(event) => onSearchName(event)}
        placeholder="Search product..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          ),
        }}
      />

      <Tooltip title="Filter list">
        <IconButton>
          <Iconify icon={'ic:round-filter-list'} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
