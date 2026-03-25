import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  Text,
  Badge,
  Box,
} from '@toucan-ui/core';

export interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

interface PropTableProps {
  props: PropDefinition[];
}

export function PropTable({ props }: PropTableProps) {
  if (props.length === 0) return null;

  return (
    <Box padding="none" radius="md" elevation={0} overflow="scroll">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Type</TableHeader>
            <TableHeader>Default</TableHeader>
            <TableHeader>Required</TableHeader>
            <TableHeader>Description</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.map((prop) => (
            <TableRow key={prop.name}>
              <TableCell>
                <Text as="span" size="sm">
                  <code>{prop.name}</code>
                </Text>
              </TableCell>
              <TableCell>
                <Text as="span" size="sm" muted>
                  <code>{prop.type}</code>
                </Text>
              </TableCell>
              <TableCell>
                <Text as="span" size="sm" muted>
                  {prop.default ? <code>{prop.default}</code> : '—'}
                </Text>
              </TableCell>
              <TableCell>
                {prop.required ? (
                  <Badge variant="danger" size="sm">
                    Required
                  </Badge>
                ) : (
                  <Text as="span" size="sm" muted>
                    No
                  </Text>
                )}
              </TableCell>
              <TableCell>
                <Text as="span" size="sm">
                  {prop.description}
                </Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
